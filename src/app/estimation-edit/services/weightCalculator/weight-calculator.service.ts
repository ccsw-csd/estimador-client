import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeightCalculationRequest } from 'src/app/core/model/WeightCalculationRequest';
import { WeightCalculationResponse } from 'src/app/core/model/WeightCalculationResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeightCalculatorService {

  constructor(private http: HttpClient) { }

  calculateWeights(weightCalculationRequest: WeightCalculationRequest): Observable<WeightCalculationResponse[]> {

    return this.http.post<WeightCalculationResponse[]>(environment.server + '/weightcalculator/calculate', weightCalculationRequest);

  }
}
