import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CostPerGrade } from 'src/app/core/model/CostPerGrade';
import { Estimation } from 'src/app/core/model/Estimation';
import { Fte } from 'src/app/core/model/Fte';
import { ProfileParticipation } from 'src/app/core/model/ProfileParticipation';
import { Project } from 'src/app/core/model/Project';
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
  @ViewChild('tasks') tasks: TasksComponent;
  @ViewChild('summary') summary: SummaryComponent;

  constructor(private route: ActivatedRoute, 
    private estimationEditService: EstimationEditService,
    private userService: UserService,
    private elementWeightService: ElementWeightService,
    private globalCriteriaService: GlobalCriteriaService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    var grades = ["A", "B", "C", "D"];

    var routeId = this.route.snapshot.paramMap.get('id');
    
    if(routeId == null) {
      var dataTotal = 2;
      var blocks = JSON.parse(sessionStorage.getItem("blocks"));
      var profiles = JSON.parse(sessionStorage.getItem("profiles"));
      this.estimation = new Estimation();
      this.estimation.project = new Project();
      this.estimation.showhours = false;
      this.estimation.architectureTasks = [];
      this.estimation.considerations = [];
      this.estimation.developmentTasksHours = [];
      this.estimation.developmentTasksWeights = [];
      this.estimation.distribution = [];
      this.estimation.teamPyramid = [];
      this.estimation.costs = [];

      /*
      this.elementWeightService.findElementWeightsByEstimationId(1).subscribe((data) => {
        //TODOthis.estimation.elementsWeights = data;
        this.stopLoading(dataTotal--);
      });

      this.userService.getUserByUsername(this.authService.getUsername()).subscribe((user) => {
        //TODOthis.estimation.createdBy = user;
        this.stopLoading(dataTotal--);
      });

      this.globalCriteriaService.findGlobalCriteriaByEstimationId(1).subscribe((data) => {
        //TODOthis.estimation.globalCriteria = data;
        this.stopLoading(dataTotal--);
      });
      */
      
      grades.forEach(grade => {
        var costByGradeRow = new CostPerGrade();
        costByGradeRow.grade = grade;
        costByGradeRow.cost = 0;
        costByGradeRow.workdays = 0;
        costByGradeRow.margin = 0;
        costByGradeRow.revenue = 0;
        this.estimation.costs.push(costByGradeRow);
      })
      

      blocks.forEach(block => {
        var profPart = new ProfileParticipation();
        profPart.block = block;
        profPart.total = 0;
        profPart.workdays = 0;
        this.estimation.distribution.push(profPart);
      });

      profiles.forEach(profile => {
        var fte = new Fte();
        fte.profile = profile;
        fte.fte = 0;
        this.estimation.teamPyramid.push(fte);
      });
    }
    else {
      this.estimationEditService.getEstimation(+routeId).subscribe((estimation) => {
        estimation.teamPyramid.sort((a : Fte,b : Fte) => a.profile.id - b.profile.id);
        estimation.distribution.sort((a : ProfileParticipation,b : ProfileParticipation) => a.block.id - b.block.id);
        this.initialize(estimation);
      });
    }
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

      this.loading = false;
  }

  save() {
    this.loading = true;
    this.estimationEditService.saveEstimation(this.estimation).subscribe((estimationId) => {

      this.estimationEditService.getEstimation(+estimationId).subscribe((estimation) => {
        estimation.teamPyramid.sort((a : Fte,b : Fte) => a.profile.id - b.profile.id);
        estimation.distribution.sort((a : ProfileParticipation,b : ProfileParticipation) => a.block.id - b.block.id);
        this.initialize(estimation);
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
      this.loading = false;
    }
  }
  
}
