import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Department';
import { Router } from '@angular/router';
import ApiService from 'src/app/shared/api.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private service:ApiService, private router: Router) { }

  response:string = '';
  empName:string = '';
  empDep:string = '';
  dataContratacao = '';
  depList:Department[] = [];

  ngOnInit(): void {
    this.getDepList();
  }

  getDepList = () => {
    this.service.getAllDepartmentNames().subscribe((deps) => {
      this.depList = deps;
    })
  }

  checkFilledFields = () => {
    return this.empName && this.empDep && this.dataContratacao;
  }

  addEmployee = () => {
    if (!this.checkFilledFields()) return;
    let emp: Employee = {
      EmployeeId: 0,
      Nome: this.empName,
      Departamento: this.empDep,
      DataContratacao: this.dataContratacao,
    }
    this.service.addEmployee(emp).subscribe((res) => {
      this.response = res.toString();
    })
  }

  close = () => {
    this.response = '';
    this.router.navigateByUrl('/employee');
  }

}
