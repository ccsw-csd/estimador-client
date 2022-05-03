import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDevelopmentHours } from 'src/app/core/model/TaskDevelopmentHours';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskDevelopmentHoursService {

  constructor(private http: HttpClient) { }

  findTasksDevelopmentHoursByEstimationId(id: number): Observable<TaskDevelopmentHours[]> {

    return this.http.get<TaskDevelopmentHours[]>(environment.server + '/taskDevelopmentHours/estimation/' + id);

  }
}
