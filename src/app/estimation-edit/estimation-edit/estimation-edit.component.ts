import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estimation } from 'src/app/core/model/Estimation';
import { EstimationEditService } from '../services/estimation-edit.service';

@Component({
  selector: 'app-estimation-edit',
  templateUrl: './estimation-edit.component.html',
  styleUrls: ['./estimation-edit.component.scss']
})
export class EstimationEditComponent implements OnInit {

  public estimation: Estimation;
  public loading: Boolean = true;

  constructor(private route: ActivatedRoute, 
    private estimationEditService: EstimationEditService,
    private router: Router) { }

  ngOnInit(): void {
    var id = +this.route.snapshot.paramMap.get('id');
    this.estimationEditService.getEstimation(id).subscribe((estimation) => {
      this.estimation = estimation;
      this.loading = false;
    })
  }

  close() {
    this.router.navigate(['/main']);

  }

}
