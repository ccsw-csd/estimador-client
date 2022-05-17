import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlockCalculationRequest } from 'src/app/core/model/BlockCalculationRequest';
import { BlockCalculationResponse } from 'src/app/core/model/BlockCalculationResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockCalculationService {

  constructor(private http: HttpClient) { }

  calculateBlockDuration(blockCalculationRequest: BlockCalculationRequest): Observable<BlockCalculationResponse[]> {
    return this.http.post<BlockCalculationResponse[]>(environment.server + '/blockdurationcalculator/calculate', blockCalculationRequest);
  }

  calculateTotalDuration(totalDurationRequest: BlockCalculationResponse[]): Observable<number> {
    return this.http.post<number>(environment.server + '/blockdurationcalculator/calculate-total', totalDurationRequest);
  }
}
