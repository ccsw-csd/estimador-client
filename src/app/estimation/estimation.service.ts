import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ESTIMATION_DATA } from './model/mock-estimations';
import { Estimation } from '../core/model/Estimation';
import { EstimationPage } from './model/EstimationPage';
import { Pageable } from '../core/model/Pageable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  constructor(
    private http: HttpClient
  ) { }

  getEstimations(pageable: Pageable): Observable<EstimationPage>{
    return this.http.post<EstimationPage>('http://localhost:8080/estimation/',{pageable:pageable});
    //return of(ESTIMATION_DATA);
  }
}
