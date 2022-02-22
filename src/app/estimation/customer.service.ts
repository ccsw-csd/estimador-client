import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../core/model/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url='http://localhost:8080/customer/'

  constructor(
    private http: HttpClient
  ) { }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }
}
