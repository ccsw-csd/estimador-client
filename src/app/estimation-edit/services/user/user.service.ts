import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(environment.server + '/user/' + username);
  }

  findUsersByFilter(filter: string): Observable<User[]> {
    return this.http.post<User[]>(environment.server + '/user/filter', filter);
  }
}
