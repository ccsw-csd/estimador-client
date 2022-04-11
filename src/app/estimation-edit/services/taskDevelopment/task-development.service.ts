import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDevelopment } from 'src/app/core/model/TaskDevelopment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskDevelopmentService {

  constructor(private http: HttpClient) { }

  findTasksDevelopmentByEstimation(id: number): Observable<TaskDevelopment[]> {

    return this.http.post<TaskDevelopment[]>(environment.server + '/taskDevelopmentHours', id);

  }
}
