import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstimationService } from '../estimation.service';
import { Estimation } from 'src/app/core/model/Estimation';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/Pageable';
import { Sort } from '@angular/material/sort'
import { Customer } from 'src/app/core/model/Customer';
import { CustomerService } from '../customer.service';
import { FormControl } from '@angular/forms';
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

  dataSource = new MatTableDataSource<Estimation>();
  displayedColumns: string[] = ['cliente', 'nombre', 'fecha', 'version', 'jornadas', 'revenue', 'action'];

  customers: Customer[];
  filterCustomer: Customer;
  filterProject: string;
  filterStartDate: FormControl = new FormControl();
  filterEndDate: FormControl = new FormControl();

  customerId: number;
  projectName: string;
  startDate: Date;
  endDate: Date;

  constructor(
    private estimationService: EstimationService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers
    );

    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: this.property,
            direction: this.direction,
        }]
    }

    if (event != null) {
        pageable.pageSize = event.pageSize
        pageable.pageNumber = event.pageIndex;
    }

    this.estimationService.getEstimations(pageable, this.customerId, this.projectName, this.startDate, this.endDate).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });
  }

  sortPage(sort: Sort){
    if(!sort.active || sort.direction ===''){
      this.direction = 'asc';
      this.property = 'id';
    }

    switch(sort.active){
      case 'cliente':
          this.property = 'project.customer';
          break;
      case 'nombre':
          this.property = 'project.name';
          break;
      case 'fecha':
          this.property = 'created';
          break;
      case 'version':
          this.property = 'estVersion';
          break;
      case 'jornadas':
          this.property = 'totalDays';
          break;
      case 'revenue':      
          this.property = 'totalCost';
          break;
      default:
        this.property = 'id';
    }

    this.direction = sort.direction;
    this.loadPage();
  }

  onCleanFilter(): void{
    this.filterCustomer = null;
    this.filterProject = null;
    this.filterStartDate.setValue(null);
    this.filterEndDate.setValue(null);

    this.onSearch();
  }

  onSearch(): void{
    this.customerId = this.filterCustomer != null ? this.filterCustomer.id: null;
    this.projectName = this.filterProject;
    this.startDate = this.filterStartDate.value;
    this.endDate = this.filterEndDate.value;

    this.loadPage();
  }
}
