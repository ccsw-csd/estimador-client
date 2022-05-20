import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileParticipation } from 'src/app/core/model/ProfileParticipation';
import { GradeWorkDaysCalculationResponse } from 'src/app/core/model/GradeWorkDaysCalculationResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeWorkDaysCalculationService {

  constructor(private http: HttpClient) { }

  calculateGradeWorkDays(gradeWorkDaysCalculationRequest: ProfileParticipation[]): Observable<GradeWorkDaysCalculationResponse[]> {
    return this.http.post<GradeWorkDaysCalculationResponse[]>(environment.server + '/gradeworkdayscalculator/calculate', gradeWorkDaysCalculationRequest);
  }
}
