import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { UserInfoSSO } from '../../model/UserInfoSSO';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : UserInfoSSO | null = null;
  navOpen = true;
  isloading : boolean = false;
  @Output() navOpenEvent = new EventEmitter();
  items: MenuItem[];

  constructor(
    public authService: AuthService,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    public dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserInfo();
    this.items = [{
      label: "Logout",
      icon: 'pi pi-sign-out',
      command: () => {
          this.logout();
      }
    }]
  }

  toggleSideNav() {
    this.navOpen = !this.navOpen;
    this.navOpenEvent.emit(this.navOpen);
  }

  getName() : string {
    if (this.user == null) return "";

    let name : string = this.user.displayName;

    return name;
  }

  logout() {
    this.authService.logout();
  }

  getEmailRef() {
    let gitWord2 = "pge";
    let gitWord4 = "i";
    let gitWord3 = "min";
    let gitWord1 = "ca";

    let gitWord = gitWord1+gitWord2+gitWord3+gitWord4;

    return "mailto:ccsw.support@"+gitWord+".com?subject=["+environment.appCode+"] Consulta / Feedback";
  }  
}
