import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  frontVersion : string = "1.0.0";
  backVersion : string = "1.0.0";
  items: MenuItem[];

  constructor(public authService: AuthService,
    public dialogService: DialogService,
    public utilsService: UtilsService,) { }

  ngOnInit(): void {
    this.items = [
      {label: "Main", routerLink: '/main'},
      {label: "Feedback", url: 'mailto:ccsw.support@capgemini.com?subject=[Estimador] Consulta / Feedback'}
      ];

    this.utilsService.getAppVersion().subscribe((result: any) => {
      this.backVersion = result.version;
    });
  }


  gruposAlert() : void {

    this.dialogService.open(DialogComponent, {width: '500px', height: '250px', header:"Forbidden",closable:false, data: {
      description: 'You do not have permissions to manage groups. Please contact the support email (ccsw.support@capgemini.com).'}
    });

  }

}
