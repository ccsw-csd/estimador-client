import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ESTIMATION_DATA } from './model/mock-estimations';
import { Estimation } from '../core/model/Estimation';
import { EstimationPage } from './model/EstimationPage';
import { Pageable } from '../core/model/Pageable';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  url: string = 'http://localhost:8080/estimation';

  constructor(
    private http: HttpClient
  ) { }

    private composeFindUrl(customerId? :number, projectName?: string, startDate?: Date, endDate?: Date): string{
      let params= '';

      if(customerId != null){
        params += 'idCustomer='+customerId;
      }

      if(projectName != null){
        if(params != '') params += "&";
        params += "nameProject="+projectName;
      }

      if(startDate != null){
        if(params != '') params += "&";
        let formatStartDate = formatDate(startDate, 'dd/MM/yyyy', 'es-ES')
        params += "startDate="+formatStartDate;
      }

      if(endDate != null){
        if(params != '') params += "&";
        let formatEndDate = formatDate(endDate, 'dd/MM/yyyy', 'es-ES')
        params += "startDate="+formatEndDate;
      }

      if(params == '') return this.url;
      else return this.url + '?'+params;
    }

  getEstimations(pageable: Pageable, customerId? :number, projectName?: string, startDate?: Date, endDate?: Date): Observable<EstimationPage>{
    return this.http.post<EstimationPage>(this.composeFindUrl(customerId, projectName, startDate, endDate),{pageable:pageable, customerId, projectName, startDate, endDate});
    //return of(ESTIMATION_DATA);
  }
}
