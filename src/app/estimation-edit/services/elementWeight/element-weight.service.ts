import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer';
import { ElementWeight } from 'src/app/core/model/ElementWeight';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementWeightService {

  constructor(private http: HttpClient) { }

  findElementWeightsByEstimation(id: number ): Observable<ElementWeight[]> {
    return this.http.post<ElementWeight[]>(environment.server + '/elementWeight/estimation', id);
  }

  findElementWeightsByEstimationCustomer(customer: Customer ): Observable<ElementWeight[]> {
    return this.http.post<ElementWeight[]>(environment.server + '/elementWeight/customer', customer);
  }
}
