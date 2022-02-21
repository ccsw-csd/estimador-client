import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstimationService } from '../estimation.service';
import { Estimation } from 'src/app/core/model/Estimation';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/Pageable';
import { Sort } from '@angular/material/sort'

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

  constructor(
    private estimationService: EstimationService,
  ) { }

  ngOnInit(): void {
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

    this.estimationService.getEstimations(pageable).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
        console.log(data.content)
    });
  }

  sortPage(sort: Sort){
    if(!sort.active || sort.direction ===''){
      this.direction = 'asc';
      this.property = 'id';
    }

    switch(sort.active){
      case 'cliente':
          if(sort.direction =='')
            this.direction = 'asc'
          else{
          this.direction = sort.direction;
          this.property = 'project.customer';
          }
          this.loadPage();
          break;
      case 'nombre':
        if(sort.direction =='')
            this.direction = 'asc'
          else{
          this.direction = sort.direction;
          this.property = 'project.name';
          }
          this.loadPage();
          break;
      case 'fecha':
        if(sort.direction =='')
            this.direction = 'asc'
          else{
          this.direction = sort.direction;
          this.property = 'created';
          }
          this.loadPage();
          break;
      case 'version':
        if(sort.direction =='')
            this.direction = 'asc'
          else{
          this.direction = sort.direction;
          this.property = 'estVersion';
          }
          this.loadPage();
          break;
      case 'jornadas':
        if(sort.direction =='')
            this.direction = 'asc'
          else{
          this.direction = sort.direction;
          this.property = 'totalDays';
          }
          this.loadPage();
          break;
      case 'revenue':
        if(sort.direction =='')
            this.direction = 'asc'
          else{
          this.direction = sort.direction;
          this.property = 'totalCost';
          }
          this.loadPage();
          break;
      default:
        this.loadPage();
    }
  }
}
