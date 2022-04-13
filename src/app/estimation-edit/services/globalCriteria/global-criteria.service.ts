import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Criterion } from 'src/app/core/model/Criterion';
import { Customer } from 'src/app/core/model/Customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalCriteriaService {

  constructor(private http: HttpClient) { }

  findGlobalCriteriaByEstimationId(id: number): Observable<Criterion[]> {
    return this.http.get<Criterion[]>(environment.server + '/parameter/estimation/' + id);
  }

  findGlobalCriteriaByEstimationCustomer(customer: Customer): Observable<Criterion[]> {
    return this.http.post<Criterion[]>(environment.server + '/parameter/customer', customer);
  }
}
