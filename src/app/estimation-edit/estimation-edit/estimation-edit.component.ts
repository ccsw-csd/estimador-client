import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Estimation } from 'src/app/core/model/Estimation';
import { Project } from 'src/app/core/model/Project';
import { AuthService } from 'src/app/core/services/auth.service';
import { CollaboratorService } from '../services/collaborator/collaborator.service';
import { ConsiderationService } from '../services/consideration/consideration.service';
import { ElementWeightService } from '../services/elementWeight/element-weight.service';
import { EstimationEditService } from '../services/estimation-edit.service';
import { GlobalCriteriaService } from '../services/globalCriteria/global-criteria.service';
import { TaskArchitectureService } from '../services/taskArchitecture/task-architecture.service';
import { TaskDevelopmentService } from '../services/taskDevelopment/task-development.service';
import { UserService } from '../services/user/user.service';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-estimation-edit',
  templateUrl: './estimation-edit.component.html',
  styleUrls: ['./estimation-edit.component.scss']
})
export class EstimationEditComponent implements OnInit {

  public estimation: Estimation;
  public collaborators: Collaborator[] = [];
  public loading: Boolean = true;
  @ViewChild('tasks') tasks: TasksComponent;

  constructor(private route: ActivatedRoute, 
    private estimationEditService: EstimationEditService,
    private collaboratorService: CollaboratorService,
    private userService: UserService,
    private elementWeightService: ElementWeightService,
    private globalCriteriaService: GlobalCriteriaService,
    private taskArchitectureService: TaskArchitectureService,
    private taskDevelopmentService: TaskDevelopmentService,
    private considerationService: ConsiderationService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    var routeId = this.route.snapshot.paramMap.get('id');
    
    if(routeId == null) {
      var dataTotal = 2;
      this.estimation = new Estimation();
      this.estimation.project = new Project();
      this.estimation.showhours = false;
      this.estimation.architectureTasks = [];
      this.estimation.considerations = [];
      this.estimation.developmentTasks = [];

      this.elementWeightService.findElementWeightsByEstimation(1).subscribe((data) => {
        this.estimation.elementsWeights = data;
        this.stopLoading(dataTotal--);
      });

      this.userService.getUserByUsername(this.authService.getUsername()).subscribe((user) => {
        this.estimation.createdBy = user;
        this.stopLoading(dataTotal--);
      });

      this.globalCriteriaService.findGlobalCriteriaByEstimation(1).subscribe((data) => {
        this.estimation.globalCriteria = data;
        this.stopLoading(dataTotal--);
      });
    }
    else {
      var dataTotal = 5;
      
      this.estimationEditService.getEstimation(+routeId).subscribe((estimation) => {
        this.estimation = estimation;

        this.collaboratorService.findCollaborators(this.estimation.id).subscribe((data) => {
          this.collaborators = data;
          this.stopLoading(dataTotal--);
        });

        this.elementWeightService.findElementWeightsByEstimation(this.estimation.id).subscribe((data) => {
          this.estimation.elementsWeights = data;
          this.stopLoading(dataTotal--);
        });

        this.globalCriteriaService.findGlobalCriteriaByEstimation(this.estimation.id).subscribe((criteria) => {
          this.estimation.globalCriteria = criteria;
          this.stopLoading(dataTotal--);
        });

        this.taskArchitectureService.findTasksArchitectureByEstimation(this.estimation.id).subscribe((tasks) => {
          this.estimation.architectureTasks = tasks;
          this.stopLoading(dataTotal--);
        });

        this.taskDevelopmentService.findTasksDevelopmentByEstimation(this.estimation.id).subscribe((tasks) => {
          this.estimation.developmentTasks = tasks;
          this.stopLoading(dataTotal--);
        });

        this.considerationService.findConsiderationsByEstimation(this.estimation.id).subscribe((considerations) => {
          this.estimation.considerations = considerations;
          this.stopLoading(dataTotal--);
        });

      });
    }
  }

  close() {
    this.router.navigate(['/main']);
  }

  onChange(event) {
    if(event.index == 2) {
      this.tasks.getGlobalTasks();
    }
  }

  stopLoading(dataTotal: number) {
    if(dataTotal == 0) {
      this.loading = false;
    }
  }
  
}
