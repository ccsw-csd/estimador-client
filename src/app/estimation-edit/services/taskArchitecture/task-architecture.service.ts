import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskArchitecture } from 'src/app/core/model/TaskArchitecture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskArchitectureService {

  constructor(private http: HttpClient) { }

  findTasksArchitectureByEstimation(id: number): Observable<TaskArchitecture[]> {

    return this.http.post<TaskArchitecture[]>(environment.server + '/taskArchitecture', id);

  }
}
