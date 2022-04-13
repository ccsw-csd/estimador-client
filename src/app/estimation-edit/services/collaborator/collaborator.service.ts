import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Estimation } from 'src/app/core/model/Estimation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private http: HttpClient) { }

  findCollaborators(id: number): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(environment.server + '/collaborator/' + id);
  }
}
