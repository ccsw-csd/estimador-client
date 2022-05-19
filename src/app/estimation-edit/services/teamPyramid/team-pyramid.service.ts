import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Fte} from 'src/app/core/model/Fte'

@Injectable({
  providedIn: 'root'
})
export class TeamPyramidService {

  constructor(private http: HttpClient) { }

  findTeamPyramidByEstimationId(id: number): Observable<Fte[]> {
    return this.http.get<Fte[]>(environment.server + '/teampyramid/estimation/' + id);
  }
}
