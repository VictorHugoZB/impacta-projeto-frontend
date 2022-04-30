import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Department';
import { Router, ActivatedRoute } from '@angular/router';
import ApiService from 'src/app/shared/api.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    private service:ApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  id = this.actRoute.snapshot.params['id']
  currentEmployee!: Employee;

  response:string = '';
  empName:string = '';
  empDep:string = '';
  dataContratacao = '';
  depList:Department[] = [];

  ngOnInit(): void {
    this.getDepList();
    this.getSpecificEmployee();
  }

  getDepList = () => {
    this.service.getAllDepartmentNames().subscribe((deps) => {
      this.depList = deps;
    })
  }

  getSpecificEmployee = () => {
    this.service.getEmp(this.id).subscribe((res) => {
      this.currentEmployee = res;
      this.empName = res.Nome;
      this.empDep = res.Departamento;
      this.dataContratacao = res.DataContratacao;
    })
  }

  checkFilledFields = () => {
    return this.empName && this.empDep && this.dataContratacao;
  }

  editEmployee = () => {
    if (!this.checkFilledFields()) return;
    let emp: Employee = {
      EmployeeId: this.currentEmployee.EmployeeId,
      Nome: this.empName,
      Departamento: this.empDep,
      DataContratacao: this.dataContratacao,
    }
    this.service.updateEmployee(emp).subscribe((res) => {
      this.response = res.toString();
    })
  }

  close = () => {
    this.response = '';
    this.router.navigateByUrl('/employee');
  }

}
