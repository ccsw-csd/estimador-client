import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estimation } from 'src/app/core/model/Estimation';

import { Customer } from 'src/app/core/model/Customer';
import { CustomerService } from '../customer.service';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/model/Pageable';

import { EstimationService } from '../estimation.service';

@Component({
  selector: 'app-estimation-versions',
  templateUrl: './estimation-versions.component.html',
  styleUrls: ['./estimation-versions.component.scss']
})
export class EstimationVersionsComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 25;
  totalElements: number = 0;

  property: string= 'id';
  direction: string= 'asc';

  estimations: Estimation[];
  loading: boolean;
  
  customers: Customer[];
  filterCustomer: Customer;
  filterProject: string;
  filterStartDate: Date;
  filterEndDate: Date;

  customerId: number;
  projectName: string;
  startDate: Date;
  endDate: Date;
  projectId: number;

  constructor(
    //public dialogRef: MatDialogRef<EstimationVersionsComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private estimationService: EstimationService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    //this.customerId = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers
    );

    this.loading = true;
  }

  loadPage(event?: LazyLoadEvent) {

    this.loading = true;

    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: this.property,
            direction: this.direction,
        }]
    }
    
    if (event != null) {
        pageable.pageSize = event.rows;
        pageable.pageNumber = event.first/event.rows;
        if(event.sortField != null)
          pageable.sort = [{property: event.sortField, direction: event.sortOrder == 1? "asc": "desc"}];
    }

    this.estimationService.getEstimationVersions(pageable).subscribe(data => {
        this.estimations = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
        this.loading = false; 
    });
  }

  onCleanFilter(): void{
    this.filterCustomer = null;
    this.filterProject = null;
    this.filterStartDate = null;
    this.filterEndDate = null;

    this.onSearch();
  }

  onSearch(): void{
    this.customerId = this.filterCustomer != null ? this.filterCustomer.id: null;
    this.projectName = this.filterProject;
    this.startDate = this.filterStartDate;
    this.endDate = this.filterEndDate;

    this.loadPage();
  }

  onClose() {
    this.router.navigate(['/main']);

  }

  editEstimation(id: number) {
    this.router.navigate(['/estimation-edit/' + id]);
  }  
}

