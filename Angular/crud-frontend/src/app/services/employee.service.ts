import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/v1/employees";

  constructor(private httpClient : HttpClient ) {}

  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id : number) : Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployeeById(id : number, employee : Employee) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployeeById(id : number) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}
