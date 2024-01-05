import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EstimationPage } from './model/EstimationPage';

import { Pageable } from '../core/model/Pageable';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Estimation } from '../core/model/Estimation';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  url: string = environment.server+'/estimation';

  constructor(
    private http: HttpClient
  ) { }

  getEstimations(adminView: Boolean): Observable<Estimation[]>{
    return this.http.get<Estimation[]>(this.url+"?adminView="+adminView);
  }

  getEstimationVersions(projectId?: number): Observable<Estimation[]>{
    return this.http.get<Estimation[]>(this.url + '/version/' + projectId);
  }

  duplicate(estimation: Estimation): Observable<Estimation>{
    return this.http.put<Estimation>(this.url + '/' + estimation.id + '/duplicate', {version:estimation.estVersion});
  }


}
