import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consideration } from 'src/app/core/model/Consideration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsiderationService {

  constructor(private http: HttpClient) { }

  findConsiderationsByEstimationId(id: number): Observable<Consideration[]> {

    return this.http.get<Consideration[]>(environment.server + '/consideration/estimation/' + id);

  }
}
