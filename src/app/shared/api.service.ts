import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Employee } from '../models/Employee';
import { Department } from '../models/Department';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  readonly APIUrl = 'https://localhost:44369/api';

  constructor(private http:HttpClient) { }

  getDepList():Observable<Department[]> {
    return this.http.get<Department[]>(`${this.APIUrl}/department`).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    );
  }

  addDepartment(val:Department) {
    return this.http.post(`${this.APIUrl}/department`, val).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    );
  }

  updateDepartment(val:Department) {
    return this.http.put(`${this.APIUrl}/department`, val).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    )
  }

  deleteDepartment(val:number) {
    return this.http.delete(`${this.APIUrl}/department/${val}`).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    );
  }

  getEmpList():Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.APIUrl}/employee`).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    );
  }

  addEmployee(val:Employee) {
    return this.http.post(`${this.APIUrl}/employee`, val).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    )
  }

  updateEmployee(val:Employee) {
    return this.http.put(`${this.APIUrl}/employee`, val).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    );
  }

  deleteEmployee(val:number) {
    return this.http.delete(`${this.APIUrl}/employee/${val}`).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    );
  }

  getAllDepartmentNames():Observable<Department[]> {
    return this.http.get<Department[]>(`${this.APIUrl}/Employee/ListarNomesDepartamentos`).pipe(
      catchError((err, result) => {
        console.log(err);
        return result;
      })
    );
  }
}
