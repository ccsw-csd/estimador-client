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
import { NavigatorService } from 'src/app/core/services/navigator.service';

@Component({
  selector: 'app-estimation-list',
  templateUrl: './estimation-list.component.html',
  styleUrls: ['./estimation-list.component.scss']
})
export class EstimationListComponent implements OnInit {

  contentWindowClass: String = "content-menu-close";

  adminView: boolean = false;
  roleAdmin: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 25;
  totalElements: number = 0;

  property: string= 'id';
  direction: string= 'asc';

  estimations: Estimation[];
  loading: boolean;
  
  projectName: string;
  startDate: Date;
  endDate: Date;

  constructor(
    private estimationService: EstimationService,
    navigatorService : NavigatorService,
    private customerService: CustomerService,
    private router: Router,
    public dialogService: DialogService,
    public authService: AuthService,
  ) {

    let me = this;

    navigatorService.getNavivagorChangeEmitter().subscribe(menuVisible => { 
      if (menuVisible) me.contentWindowClass = 'content-menu-open';
      else me.contentWindowClass = 'content-menu-close';
    });
   }

  ngOnInit(): void {

    if (this.authService.getRoles().indexOf("ADMIN") >= 0) {
      this.roleAdmin = true;
    }

    this.loading = true;
    this.loadPage();
  }

  loadPage() {

    this.loading = true;

    this.estimationService.getEstimations(this.adminView).subscribe(data => {
        this.estimations = data;
        this.loading = false; 
    });
  }

  createEstimation() {
    this.router.navigate(['/estimation-edit']);
  }

  editEstimation(id: number) {
    this.router.navigate(['/estimation-edit/' + id]);
  }

  openVersionDialog(projectId: number) {
    const ref = this.dialogService.open(EstimationVersionsComponent, {width: '80vw', height: '525px', header:"Listado versiones", closable:false, data: {
      projectId: projectId}
    });


    ref.onClose.subscribe((response: any) => {
      if(response != false && response != null && response.id != null) {
        this.copyEstimation(response);
      }
    });

  }
  

  copyEstimation(estimation: any) {
    const ref = this.dialogService.open(EstimationCreateCopyComponent, {width: '550px', height: '450px', header:"Duplicar version", closable:false, data: estimation});
    
    ref.onClose.subscribe((response: any) => {
      if(response != false && response != null && response.id != null) {
        this.router.navigate(['/estimation-edit/' + response.id]);
      }
    });


  }

}