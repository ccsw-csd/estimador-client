import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Estimation } from 'src/app/core/model/Estimation';
import { Fte } from 'src/app/core/model/Fte';
import { ProfileParticipation } from 'src/app/core/model/ProfileParticipation';
import { Project } from 'src/app/core/model/Project';
import { AuthService } from 'src/app/core/services/auth.service';
import { CollaboratorService } from '../services/collaborator/collaborator.service';
import { ConsiderationService } from '../services/consideration/consideration.service';
import { ElementWeightService } from '../services/elementWeight/element-weight.service';
import { EstimationEditService } from '../services/estimation-edit.service';
import { GlobalCriteriaService } from '../services/globalCriteria/global-criteria.service';
import { ProfileService } from '../services/profile/profile.service';
import { SummaryService } from '../services/summary/summary.service';
import { TaskArchitectureService } from '../services/taskArchitecture/task-architecture.service';
import { TaskDevelopmentHoursService } from '../services/taskDevelopmentHours/task-development-hours.service';
import { TaskDevelopmentWeightsService } from '../services/taskDevelopmentWeights/task-development-weights.service';
import { TeamPyramidService } from '../services/teamPyramid/team-pyramid.service';
import { UserService } from '../services/user/user.service';
import { SummaryComponent } from '../summary/summary.component';
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
  @ViewChild('summary') summary: SummaryComponent;

  constructor(private route: ActivatedRoute, 
    private estimationEditService: EstimationEditService,
    private collaboratorService: CollaboratorService,
    private userService: UserService,
    private elementWeightService: ElementWeightService,
    private globalCriteriaService: GlobalCriteriaService,
    private taskArchitectureService: TaskArchitectureService,
    private taskDevelopmentService: TaskDevelopmentHoursService,
    private taskDevelopmentWeightsService: TaskDevelopmentWeightsService,
    private considerationService: ConsiderationService,
    private summaryService: SummaryService,
    private teamPyramidService: TeamPyramidService,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    var routeId = this.route.snapshot.paramMap.get('id');
    
    if(routeId == null) {
      var dataTotal = 4;
      this.estimation = new Estimation();
      this.estimation.project = new Project();
      this.estimation.showhours = false;
      this.estimation.architectureTasks = [];
      this.estimation.considerations = [];
      this.estimation.developmentTasksHours = [];
      this.estimation.developmentTasksWeights = [];
      this.estimation.profileParticipation = [];
      this.estimation.teamPyramid = [];

      this.elementWeightService.findElementWeightsByEstimationId(1).subscribe((data) => {
        this.estimation.elementsWeights = data;
        this.stopLoading(dataTotal--);
      });

      this.userService.getUserByUsername(this.authService.getUsername()).subscribe((user) => {
        this.estimation.createdBy = user;
        this.stopLoading(dataTotal--);
      });

      this.globalCriteriaService.findGlobalCriteriaByEstimationId(1).subscribe((data) => {
        this.estimation.globalCriteria = data;
        this.stopLoading(dataTotal--);
      });

      this.estimationEditService.findBlocks().subscribe((blocks) => {
        blocks.forEach(block => {
          var profPart = new ProfileParticipation();
          profPart.block = block;
          profPart.total = 0;
          profPart.workdays = 0;
          this.estimation.profileParticipation.push(profPart);
        });
        this.stopLoading(dataTotal--);
      });

      this.profileService.findProfiles().subscribe((profiles) => {
        profiles.forEach(profile => {
          var fte = new Fte();
          fte.profile = profile;
          fte.fte = 0;
          this.estimation.teamPyramid.push(fte);
        });

        this.stopLoading(dataTotal--);
      });

    }
    else {
      var dataTotal = 8;
      
      this.estimationEditService.getEstimation(+routeId).subscribe((estimation) => {
        this.estimation = estimation;
        this.estimation.teamPyramid = [];
        this.estimation.profileParticipation = [];

        this.collaboratorService.findCollaboratorsByEstimationId(this.estimation.id).subscribe((data) => {
          this.collaborators = data;
          this.stopLoading(dataTotal--);
        });

        this.elementWeightService.findElementWeightsByEstimationId(this.estimation.id).subscribe((data) => {
          this.estimation.elementsWeights = data;
          this.stopLoading(dataTotal--);
        });

        this.globalCriteriaService.findGlobalCriteriaByEstimationId(this.estimation.id).subscribe((criteria) => {
          this.estimation.globalCriteria = criteria;
          this.stopLoading(dataTotal--);
        });

        this.taskArchitectureService.findTasksArchitectureByEstimationId(this.estimation.id).subscribe((tasks) => {
          this.estimation.architectureTasks = tasks;
          this.stopLoading(dataTotal--);
        });

        this.taskDevelopmentService.findTasksDevelopmentHoursByEstimationId(this.estimation.id).subscribe((tasks) => {
          this.estimation.developmentTasksHours = tasks;
          this.stopLoading(dataTotal--);
        });

        this.taskDevelopmentWeightsService.findTasksDevelopmentWeightsByEstimationId(this.estimation.id).subscribe((tasks) => {
          this.estimation.developmentTasksWeights = tasks;
          this.stopLoading(dataTotal--);
        });

        this.considerationService.findConsiderationsByEstimationId(this.estimation.id).subscribe((considerations) => {
          this.estimation.considerations = considerations;
          this.stopLoading(dataTotal--);
        });

        this.summaryService.findSummaryByEstimationId(this.estimation.id).subscribe((summary) => {
          this.estimationEditService.findBlocks().subscribe((blocks) => {

            blocks.forEach(block => {
              var profPart = new ProfileParticipation();
              profPart.block = block;
              profPart.total = 0;
              profPart.workdays = 0;

              summary.forEach(element => {
                if(block.id == element.block.id) {
                  profPart = element;
                  if(profPart.workdays == null) {
                    profPart.workdays = 0;
                  }
                }
              });
              this.estimation.profileParticipation.push(profPart);
            });
            this.stopLoading(dataTotal--);
          });
        });

        this.teamPyramidService.findTeamPyramidByEstimationId(this.estimation.id).subscribe((teamPyramid) => {
          this.profileService.findProfiles().subscribe((profiles) => {
            profiles.forEach(profile => {
              var fte = new Fte(); 
              fte.profile = profile;
              fte.fte = 0;
              this.estimation.teamPyramid.push(fte);

              teamPyramid.forEach(ftedb => {
                this.estimation.teamPyramid.forEach(fte => {
                  if(fte.profile.id == ftedb.profile.id) {
                    fte.fte = ftedb.fte;
                  }
                });
              });
            });
            this.stopLoading(dataTotal--);
          });
        });
      });
    }
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
      this.summary.calculateFixedFtes();
      this.summary.calculateTotalFte();
      this.summary.calculateBlockDuration();
    }
  }

  stopLoading(dataTotal: number) {
    if(dataTotal == 0) {
      this.loading = false;
    }
  }
  
}
