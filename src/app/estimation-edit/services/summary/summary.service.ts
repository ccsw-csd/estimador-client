import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileParticipation } from 'src/app/core/model/ProfileParticipation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient) { }

  findSummaryByEstimationId(id: number): Observable<ProfileParticipation[]> {
    return this.http.get<ProfileParticipation[]>(environment.server + '/summary/estimation/' + id);
  }
}
