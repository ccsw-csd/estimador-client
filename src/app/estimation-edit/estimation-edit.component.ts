import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Estimation } from 'src/app/core/model/Estimation';
import { Fte } from 'src/app/core/model/Fte';
import { ProfileParticipation } from 'src/app/core/model/ProfileParticipation';
import { AuthService } from 'src/app/core/services/auth.service';
import { CriteriaComponent } from './criteria/criteria.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { ElementWeightService } from './services/elementWeight/element-weight.service';
import { EstimationEditService } from './services/estimation-edit.service';
import { GlobalCriteriaService } from './services/globalCriteria/global-criteria.service';
import { UserService } from './services/user/user.service';
import { SummaryComponent } from './summary/summary.component';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-estimation-edit',
  templateUrl: 'estimation-edit.component.html',
  styleUrls: ['estimation-edit.component.scss']
})
export class EstimationEditComponent implements OnInit {

  public estimation: Estimation;
  public loadingView: Boolean = true;
  public loading: Boolean = false;
  saveEvents = {'save': false};

  @ViewChild('generalData') generalData: GeneralDataComponent;
  @ViewChild('criteria') criteria: CriteriaComponent;
  @ViewChild('tasks') tasks: TasksComponent;
  @ViewChild('summary') summary: SummaryComponent;

  constructor(private route: ActivatedRoute, 
    private estimationEditService: EstimationEditService,
    private userService: UserService,
    private elementWeightService: ElementWeightService,
    private globalCriteriaService: GlobalCriteriaService,
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    var grades = ["A", "B", "C", "D"];

    var routeId = this.route.snapshot.paramMap.get('id');
    
    this.estimationEditService.getEstimation(+routeId).subscribe((estimation) => {
      estimation.teamPyramid.sort((a : Fte,b : Fte) => a.profile.id - b.profile.id);
      estimation.distribution.sort((a : ProfileParticipation,b : ProfileParticipation) => a.block.id - b.block.id);
      this.initialize(estimation);
    });
  }
  
  initialize(estimation: Estimation) : void {
      this.estimation = estimation;

      if(this.estimation.id == undefined) {
        this.estimation.created = new Date();
      }
      else {
        var date = new Date(this.estimation.created);
        this.estimation.created = date;
      }
      this.estimation.lastUpdate = new Date();

      this.loadingView = false;
  }
  

  getNotification(event) {

    Object.keys(event).forEach(key => {
      this.saveEvents[key] = event[key];
    });

    let isPrepareCompleted = true;

    Object.keys(this.saveEvents).forEach(key => {
      isPrepareCompleted = isPrepareCompleted && this.saveEvents[key];
    });

    if (isPrepareCompleted) this.completeSave();
  }

  

  save() {
    this.loading = true;

    this.saveEvents = {'save': false};

    if(!this.estimation.showhours) {
      this.getNotification({'getDevelopmentWeightsHours':false});
      this.tasks.getDevelopmentWeightsHours();
    }

    this.getNotification({'getGlobalTasks':false});
    this.tasks.getGlobalTasks();

    this.getNotification({'initializeCalculation':false});
    this.summary.initializeCalculation();

    this.getNotification({'save':true});
  }

  completeSave() {
    let errorParams = ``;

    if (this.estimation.project == null || this.estimation.project.name == null || this.estimation.project.name.length == 0) {
      errorParams += `<li><b>Datos generales.</b> El 'Nombre del proyecto' no puede estar vacío</li>`; 
    }

    if (this.estimation.project == null || this.estimation.project.customer == null || this.estimation.project.customer.name == null || this.estimation.project.customer.name.length == 0) {
      errorParams += `<li><b>Datos generales.</b> El 'Cliente' no puede estar vacío</li>`; 
    }
    
    if (errorParams.length > 0) {
      this.loading = false;
      let message = `No se puede guardar la estimación ya que existen errores en algunos campos: <br/><ul>`+errorParams+`</ul>`;
      
      this.confirmationService.confirm({
        header: 'Error al guardar estimación',
        message: message,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar',
        acceptIcon: '',
        rejectVisible: false,
        closeOnEscape: false,      
        accept: () => {
        }
      });

      return;
    }

    this.estimationEditService.saveEstimation(this.estimation).subscribe((estimationId) => {
      
      this.saveEvents = {'save': false};
      
      this.estimationEditService.getEstimation(+estimationId).subscribe((estimation) => {
        estimation.teamPyramid.sort((a : Fte,b : Fte) => a.profile.id - b.profile.id);
        estimation.distribution.sort((a : ProfileParticipation,b : ProfileParticipation) => a.block.id - b.block.id);
        this.initialize(estimation);

        this.generalData.estimation = this.estimation;
        this.criteria.estimation = this.estimation;        
        this.tasks.estimation = this.estimation;
        this.summary.estimation = this.estimation;

        this.generalData.initializateData();
        this.tasks.initializateData();
        this.summary.initializateData();

        this.loading = false;
      });      

    })
    
  }

  close() {
    this.router.navigate(['/main']);
  }

  onChange(event) {
    if(event.index == 2) {
      if(!this.estimation.showhours) {
        this.tasks.getDevelopmentWeightsHours();
      }
      this.tasks.getGlobalTasks();
    }
    else if(event.index == 3) {
      this.summary.initializeCalculation();
    }
  }

  stopLoading(dataTotal: number) {
    if(dataTotal == 0) {
      this.loadingView = false;
    }
  }
  exportar() {
    this.estimationEditService.sendToExport(this.estimation).subscribe(
      result => {
        this.downloadFile(result, "application/ms-excel");
      }
    );
  }
  downloadFile(data: any, type: string) {

    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    var a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = 'Report.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
