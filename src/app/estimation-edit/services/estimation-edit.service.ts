import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer';
import { Estimation } from 'src/app/core/model/Estimation';
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

    findCustomersByFilter(filter: string): Observable<Customer[]> {
      return this.http.post<Customer[]>(environment.server + '/customer/', filter);
    }
}
