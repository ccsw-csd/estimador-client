import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Criterion } from 'src/app/core/model/Criterion';
import { FteCalculationResponse } from 'src/app/core/model/FteCalculationResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FteCalculationService {

  constructor(private http: HttpClient) { }

  calculateFte(criteriaList: Criterion[]): Observable<FteCalculationResponse> {
    return this.http.post<FteCalculationResponse>(environment.server + '/ftecalculator/calculate', criteriaList);
  }
}
