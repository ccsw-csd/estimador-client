import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private http: HttpClient) { }

  findCollaboratorsByEstimationId(id: number): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(environment.server + '/collaborator/estimation/' + id);
  }
}
