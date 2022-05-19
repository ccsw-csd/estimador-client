import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/core/model/Profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  findProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(environment.server + "/profile");
  }
}
