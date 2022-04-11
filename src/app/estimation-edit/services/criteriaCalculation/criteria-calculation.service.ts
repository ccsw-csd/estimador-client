import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriteriaCalculationGet } from 'src/app/core/model/CriteriaCalculationGet';
import { CriteriaCalculationSend } from 'src/app/core/model/CriteriaCalculationSend';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriteriaCalculationService {

  constructor(private http: HttpClient) { }

  calculateHoursWithCriteria(criteriaCalculationSend: CriteriaCalculationSend): Observable<CriteriaCalculationGet[]> {
    return this.http.post<CriteriaCalculationGet[]>(environment.server + '/criteriacalculation/calculate', criteriaCalculationSend);
  }
}
