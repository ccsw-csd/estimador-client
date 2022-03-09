import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ResponseCredentials } from 'src/app/core/model/ResponseCredentials';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string = "";
  password: string = "";
  isloading : boolean = false;

  constructor(
    private loginService: LoginService,
    private auth: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    if(this.auth.getToken() != null){
      this.router.navigate(['main']);
    }
  }

  login() {

    if (this.user == "") return;
    if (this.password == "") return;

    this.isloading = true;

    this.loginService.login(this.user, this.password).subscribe(
      (res: ResponseCredentials) => {

        this.loginService.putCredentials(res);

        this.router.navigate(['main']);
        this.isloading = false;
      },
      () => {

        this.snackbarService.error('Wrong credentials.');
        this.isloading = false;
      }
    );

  }  
}
