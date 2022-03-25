import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Estimation } from 'src/app/core/model/Estimation';
import { Project } from 'src/app/core/model/Project';
import { AuthService } from 'src/app/core/services/auth.service';
import { EstimationEditService } from '../services/estimation-edit.service';

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
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    var routeId = this.route.snapshot.paramMap.get('id');
    
    if(routeId == null) {
      this.estimation = new Estimation();
      this.estimation.project = new Project();
      this.estimationEditService.getUserByUsername(this.authService.getUsername()).subscribe((user) => {
        this.estimation.createdBy = user;
        this.loading = false;
      });
    }
    else {
      this.estimationEditService.getEstimation(+routeId).subscribe((estimation) => {
        this.estimation = estimation;
        this.estimationEditService.findCollaborators(this.estimation).subscribe((data) => {
          this.collaborators = data;
          this.loading = false;
        });
      });
    }
  }

  close() {
    this.router.navigate(['/main']);

  }
  
}
