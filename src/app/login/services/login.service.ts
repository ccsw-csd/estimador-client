import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResponseCredentials } from 'src/app/core/model/ResponseCredentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private authService: AuthService,) {}

    authenticate(username: string, password: string): Observable<ResponseCredentials> {
      this.authService.clearCredentials();    
      return this.http.post<ResponseCredentials>(environment.sso + '/authenticate', {username:username, password: password});
    }
  
    putSSOCredentials(res: ResponseCredentials) {
      this.authService.putSSOCredentials(res);
    }
  
}

