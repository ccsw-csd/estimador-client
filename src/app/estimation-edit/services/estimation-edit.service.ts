import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Customer } from 'src/app/core/model/Customer';
import { Estimation } from 'src/app/core/model/Estimation';
import { User } from 'src/app/core/model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimationEditService {

  constructor(
    private http: HttpClient
  ) { }

    getEstimation(id: number): Observable<Estimation> {
      return this.http.get<Estimation>(environment.server + '/estimation/' + id);
    }

    findCollaborators(estimation: Estimation): Observable<Collaborator[]> {
      return this.http.post<Collaborator[]>(environment.server + '/collaborator', estimation);
    }

    findCustomersByFilter(filter: string): Observable<Customer[]> {
      return this.http.post<Customer[]>(environment.server + '/customer/', filter);
    }

    getUserByUsername(username: string): Observable<User> {
      return this.http.get<User>(environment.server + '/user/' + username);
    }

    findUsersByFilter(filter: string): Observable<User[]> {
      return this.http.post<User[]>(environment.server + '/user/filter', filter);
    }
}
