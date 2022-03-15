import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estimation } from 'src/app/core/model/Estimation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimationEditService {

  constructor(
    private http: HttpClient
  ) { }

    getEstimation(id: number): Observable<Estimation> {
      return this.http.get<Estimation>(environment.server + '/estimation/' + id);
    }
}
