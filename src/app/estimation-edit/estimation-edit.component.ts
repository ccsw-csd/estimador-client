import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Estimation } from 'src/app/core/model/Estimation';
import { Fte } from 'src/app/core/model/Fte';
import { ProfileParticipation } from 'src/app/core/model/ProfileParticipation';
import { AuthService } from 'src/app/core/services/auth.service';
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
  public loading: Boolean = true;
  public loaded: Boolean = false;
  @ViewChild('tasks') tasks: TasksComponent;
  @ViewChild('summary') summary: SummaryComponent;

  constructor(private route: ActivatedRoute, 
    private estimationEditService: EstimationEditService,
    private userService: UserService,
    private elementWeightService: ElementWeightService,
    private globalCriteriaService: GlobalCriteriaService,
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService) { }

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

      this.loaded = true;
      this.loading = false;
  }

  save() {
    let errorParams = ``;

    if (this.estimation.project == null || this.estimation.project.name == null || this.estimation.project.name.length == 0) {
      errorParams += `<li><b>Datos generales.</b> El 'Nombre del proyecto' no puede estar vacío</li>`; 
    }

    if (this.estimation.project == null || this.estimation.project.customer == null || this.estimation.project.customer.name == null || this.estimation.project.customer.name.length == 0) {
      errorParams += `<li><b>Datos generales.</b> El 'Cliente' no puede estar vacío</li>`; 
    }
    
    if (errorParams.length > 0) {
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


    this.loading = true;


    this.loading = true;
      this.calculateDevelopmentHours().subscribe(it => {
        this.summary.initializeCalculation().subscribe(() => {

          this.estimationEditService.saveEstimation(this.estimation).subscribe((estimationId) => {

            this.estimationEditService.getEstimation(+estimationId).subscribe((estimation) => {
              estimation.teamPyramid.sort((a : Fte,b : Fte) => a.profile.id - b.profile.id);
              estimation.distribution.sort((a : ProfileParticipation,b : ProfileParticipation) => a.block.id - b.block.id);
              this.initialize(estimation);
            });      
      
          })
        });
      });

  }

  calculateDevelopmentHours() {
    if (this.estimation.showhours) {
      return this.tasks.getGlobalTasks();
    }

    return this.tasks.getDevelopmentWeightsHoursObservable();
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
      this.loading = false;
    }
  }
  
}
