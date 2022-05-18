import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstimationLevel } from 'src/app/core/model/EstimationLevel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimationLevelsService {

  constructor(private http: HttpClient) { }

  findEstimationLevels(): Observable<EstimationLevel[]> {
    return this.http.get<EstimationLevel[]>(environment.server + '/estimationLevel/');
  }
}
