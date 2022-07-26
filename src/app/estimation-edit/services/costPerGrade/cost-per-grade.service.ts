import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstimationCostPerGrade } from 'src/app/core/model/EstimationCostPerGrade';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CostPerGradeService {

  constructor(private http: HttpClient) { }

  findCostPerGradeByEstimationId(id: number): Observable<EstimationCostPerGrade> {
    return this.http.get<EstimationCostPerGrade>(environment.server + '/costpergrade/estimation/' + id);
  }
}
