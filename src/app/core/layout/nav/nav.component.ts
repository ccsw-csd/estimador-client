import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
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
}
