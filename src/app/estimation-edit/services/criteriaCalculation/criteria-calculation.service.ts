import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriteriaCalculationResponse } from 'src/app/core/model/CriteriaCalculationResponse';
import { CriteriaCalculationRequest } from 'src/app/core/model/CriteriaCalculationRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriteriaCalculationService {

  constructor(private http: HttpClient) { }

  calculateHoursWithCriteria(criteriaCalculationRequest: CriteriaCalculationRequest): Observable<CriteriaCalculationResponse[]> {
    return this.http.post<CriteriaCalculationResponse[]>(environment.server + '/criteriacalculation/calculate', criteriaCalculationRequest);
  }
}
