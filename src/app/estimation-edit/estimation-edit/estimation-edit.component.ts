import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Estimation } from 'src/app/core/model/Estimation';
import { Project } from 'src/app/core/model/Project';
import { AuthService } from 'src/app/core/services/auth.service';
import { CollaboratorService } from '../services/collaborator/collaborator.service';
import { ElementWeightService } from '../services/elementWeight/element-weight.service';
import { EstimationEditService } from '../services/estimation-edit.service';
import { GlobalCriteriaService } from '../services/globalCriteria/global-criteria.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-estimation-edit',
  templateUrl: './estimation-edit.component.html',
  styleUrls: ['./estimation-edit.component.scss']
})
export class EstimationEditComponent implements OnInit {

  public estimation: Estimation;
  public collaborators: Collaborator[] = [];
  public loading: Boolean = true;

  constructor(private route: ActivatedRoute, 
    private estimationEditService: EstimationEditService,
    private collaboratorService: CollaboratorService,
    private userService: UserService,
    private elementWeightService: ElementWeightService,
    private globalCriteriaService: GlobalCriteriaService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    var routeId = this.route.snapshot.paramMap.get('id');
    
    if(routeId == null) {
      this.estimation = new Estimation();
      this.estimation.project = new Project();
      this.estimation.showhours = false;
      this.elementWeightService.findElementWeightsByEstimation(1).subscribe((data) => {
        this.estimation.elementsWeights = data;
        this.userService.getUserByUsername(this.authService.getUsername()).subscribe((user) => {
          this.estimation.createdBy = user;
          this.globalCriteriaService.findGlobalCriteriaByEstimation(1).subscribe((data) => {
            this.estimation.globalCriteria = data;
            this.loading = false;
          })
        });
      });
    }
    else {
      this.estimationEditService.getEstimation(+routeId).subscribe((estimation) => {
        this.estimation = estimation;
        this.collaboratorService.findCollaborators(this.estimation).subscribe((data) => {
          this.collaborators = data;
          this.elementWeightService.findElementWeightsByEstimation(this.estimation.id).subscribe((data) => {
            this.estimation.elementsWeights = data;
            this.globalCriteriaService.findGlobalCriteriaByEstimation(this.estimation.id).subscribe((criteria) => {
              this.estimation.globalCriteria = criteria;
              this.loading = false;
            });
          })
        });
      });
    }
  }

  close() {
    this.router.navigate(['/main']);
    
  }
  
}
