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
import { EstimationCreateCopyComponent } from '../estimation-create-copy/estimation-create-copy.component';
import { ResponseCredentials } from 'src/app/core/model/ResponseCredentials';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-estimation-list',
  templateUrl: './estimation-list.component.html',
  styleUrls: ['./estimation-list.component.scss']
})
export class EstimationListComponent implements OnInit {

  adminView: boolean = false;
  roleAdmin: boolean = false;
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
    public dialogService: DialogService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {

    if (this.authService.getRoles().indexOf("ADMIN") >= 0) {
      this.roleAdmin = true;
    }

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

    this.estimationService.getEstimations(pageable, this.adminView, this.customerId, this.projectName, this.startDate, this.endDate).subscribe(data => {
        this.estimations = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
        this.loading = false; 

        //TODO Quitar esto
        //this.copyEstimation(data.content[2]);
    });
  }

  changeAdminView() : void {
    this.loadPage();
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
    const ref = this.dialogService.open(EstimationVersionsComponent, {width: '1100px', height: '450px', header:"Listado versiones", closable:true, data: {
      projectId: projectId}
    });


    ref.onClose.subscribe((response: any) => {
      if(response != false && response != null && response.id != null) {
        this.copyEstimation(response);
      }
    });

  }
  

  copyEstimation(estimation: any) {
    const ref = this.dialogService.open(EstimationCreateCopyComponent, {width: '550px', height: '450px', header:"Duplicar version", closable:true, data: estimation});
    
    ref.onClose.subscribe((response: any) => {
      if(response != false && response != null && response.id != null) {
        this.router.navigate(['/estimation-edit/' + response.id]);
      }
    });


  }

}