import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDevelopmentWeights } from 'src/app/core/model/TaskDevelopmentWeights';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskDevelopmentWeightsService {

  constructor(private http: HttpClient) { }

  findTasksDevelopmentWeightsByEstimationId(id: number): Observable<TaskDevelopmentWeights[]> {

    return this.http.get<TaskDevelopmentWeights[]>(environment.server + '/taskDevelopmentWeights/estimation/' + id);

  }
}
