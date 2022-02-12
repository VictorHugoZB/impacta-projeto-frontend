import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Department } from '../models/Department';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  readonly APIUrl = 'https://localhost:44369/api';

  constructor(private http:HttpClient) { }

  getDepList():Observable<Department[]> {
    return this.http.get<Department[]>(`${this.APIUrl}/department`);
  }

  addDepartment(val:Department) {
    return this.http.post(`${this.APIUrl}/department`, val);
  }

  updateDepartment(val:Department) {
    return this.http.put(`${this.APIUrl}/department`, val);
  }

  deleteDepartment(val:Department) {
    return this.http.delete(`${this.APIUrl}/department/${val}`);
  }

  getEmpList():Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.APIUrl}/employee`);
  }

  addEmployee(val:Employee) {
    return this.http.post(`${this.APIUrl}/employee`, val);
  }

  updateEmployee(val:Employee) {
    return this.http.put(`${this.APIUrl}/employee`, val);
  }

  deleteEmployee(val:Employee) {
    return this.http.delete(`${this.APIUrl}/employee/${val}`);
  }

  getAllDepartmentNames():Observable<Department[]> {
    return this.http.get<Department[]>(`${this.APIUrl}/Employee/ListarNomesDepartamentos`);
  }
}
