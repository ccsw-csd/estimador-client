import { Component, OnInit } from '@angular/core';
import { EstimationService } from '../estimation.service';
import { Estimation } from 'src/app/core/model/Estimation';
import { Pageable } from 'src/app/core/model/Pageable';
import { Customer } from 'src/app/core/model/Customer';
import { CustomerService } from '../customer.service';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EstimationVersionsComponent } from '../estimation-versions/estimation-versions.component';

@Component({
  selector: 'app-estimation-list',
  templateUrl: './estimation-list.component.html',
  styleUrls: ['./estimation-list.component.scss']
})
export class EstimationListComponent implements OnInit {

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

  constructor(
    private estimationService: EstimationService,
    private customerService: CustomerService,
    private router: Router,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
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

    this.estimationService.getEstimations(pageable, this.customerId, this.projectName, this.startDate, this.endDate).subscribe(data => {
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

  createEstimation() {
    this.router.navigate(['/estimation-edit']);
  }

  editEstimation(id: number) {
    this.router.navigate(['/estimation-edit/' + id]);
  }

  openVersionDialog(projectId: number) {
    const ref = this.dialogService.open(EstimationVersionsComponent, {width: '1000px', height: '900px', header:"Listado versiones", closable:true, data: {
      projectId: projectId}
    });

    ref.onClose.subscribe((response: any) => {
      //TODO
    });
  }
  
}