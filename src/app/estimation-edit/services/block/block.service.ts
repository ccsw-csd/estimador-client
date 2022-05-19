import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Block } from 'src/app/core/model/Block';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private http: HttpClient) { }

  findBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(environment.server + '/block/');
  }
}
