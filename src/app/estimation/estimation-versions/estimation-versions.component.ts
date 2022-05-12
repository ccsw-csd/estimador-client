import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { Estimation } from 'src/app/core/model/Estimation';

import { Customer } from 'src/app/core/model/Customer';
import { CustomerService } from '../customer.service';
import { LazyLoadEvent } from 'primeng/api';

import { EstimationService } from '../estimation.service';

@Component({
  selector: 'app-estimation-versions',
  templateUrl: './estimation-versions.component.html',
  styleUrls: ['./estimation-versions.component.scss']
})
export class EstimationVersionsComponent implements OnInit {

  estimations: Estimation[];
  loading: boolean;
  
  customers: Customer[];

  projectId: number;

  constructor(
    private estimationService: EstimationService,
    private customerService: CustomerService,
    private router: Router,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }


  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers
    );

    this.projectId = this.config.data.projectId;
    this.loading = true;
  }

  
  load(event?: LazyLoadEvent) {
    this.estimationService.getEstimationVersions(this.projectId).subscribe(estimations => {
        this.estimations = estimations;
        this.loading = false;
      }
    );
  }

  editEstimation(id: number) {
    this.dialogRef.close(false);
    this.router.navigate(['/estimation-edit/' + id]);
  }
  
  copyEstimation(id: number) {
    this.dialogRef.close(false);
    //TODO
  }
}