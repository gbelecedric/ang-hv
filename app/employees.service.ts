import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from './_models/employee';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }
  _url = "./assets/data/data.json";


  getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this._url);

  }

 /* errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "server error!");
  }*/
}
