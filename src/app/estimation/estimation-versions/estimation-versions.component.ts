import { Component, Inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Estimation } from 'src/app/core/model/Estimation';

import { Customer } from 'src/app/core/model/Customer';
import { CustomerService } from '../customer.service';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/model/Pageable';

import { EstimationService } from '../estimation.service';
import { NumberFilter } from 'ag-grid-community';
import { find } from 'rxjs';

@Component({
  selector: 'app-estimation-versions',
  templateUrl: './estimation-versions.component.html',
  styleUrls: ['./estimation-versions.component.scss']
})
export class EstimationVersionsComponent implements OnInit {

  totalElements: number = 0;

  property: string= 'id';
  direction: string= 'asc';

  estimations: Estimation[];
  loading: boolean;
  
  customers: Customer[];
  filterProjectId: number;
  created: number;
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

    this.filterProjectId = this.config.data.projectId;
    this.created = this.config.data.created;
    this.loading = true;
  }

  
  loadPage(event?: LazyLoadEvent) {

    this.loading = true;
    
    let pageable : Pageable =  {
        sort: [{
            property: this.property,
            direction: this.direction,
        }]
    }
    //getEstimationVersions(pageable, this.filterProjectId)
    /*this.estimationService.getEstimationVersions(pageable, this.created).subscribe(data => {
        this.loading = false;
        this.totalElements = data.totalElements;
    });*/
    /*this.estimationService.getEstimationVersions().subscribe(data => {
      this.loading = false;
      this.totalElements = data.totalElements;
  });*/
  /*
    this.estimationService.getEstimationVersions().subscribe(data => {
      this.loading = false;
      this.totalElements = data.totalElements;
});*/
    this.estimationService.getEstimationVersions(this.filterProjectId) {
      return this.loading.created<any>(`path/to/offers/${created}`);
    }
  }

  editEstimation(id: number) {
    this.dialogRef.close(false);
    this.router.navigate(['/estimation-edit/' + id]);
  }  
}