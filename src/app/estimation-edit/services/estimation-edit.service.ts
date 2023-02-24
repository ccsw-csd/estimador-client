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

  saveEstimation(estimation: Estimation): Observable<Estimation> {
    let url = environment.server + '/estimation/';

    if (estimation.id) {
      url += estimation.id;
    }
    else {
      url += "new";
    }

    return this.http.post<Estimation>(url, estimation);
  }
  sendToExport(estimation: Estimation): Observable<object>{
    let url = environment.server + '/estimation/export';
    return this.http.post<object>(url, estimation, { responseType: 'blob' as 'json' });
  }
}
