import { Component } from '@angular/core';
import { faPen, faSearch, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Employee } from 'src/app/models/Employee';
import ApiService from 'src/app/shared/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  constructor(private service: ApiService) { }

  faTrash = faTrash;
  faPen = faPen;
  faSort = faSort;
  faSearch = faSearch;

  employeeList: Employee[] = [];
  employeeFilteredList: Employee[] = [];
  selectedEmployee!: Employee;

  loading: boolean = false;
  responseMessage: string = '';

  orderStep: number = 0;
  filterText: string = "";

  ngOnInit(): void {
    this.initializeEmpList();
  }

  initializeEmpList = () => {
    this.service.getEmpList().subscribe((emps) => {
      this.employeeList = [...emps];
      this.employeeFilteredList = [...emps];
    });
  }

  setSelectedEmployee = (emp: Employee) => {
    this.selectedEmployee = emp;
  }

  onDismiss = () => {
    this.responseMessage = '';
  }

  nextOrderStep = () => {
    if (this.orderStep === 2){
      this.orderStep = 0;
      return;
    }
    this.orderStep++;
  }

  order = (field: keyof Employee) => {
    if (this.orderStep === 0){
      this.employeeFilteredList = this.employeeFilteredList
        .sort((a, b) => {
          let aconv = a[field];
          let bconv = b[field];
          if (typeof aconv === 'string'){
            aconv = aconv.toString().toLowerCase();
            bconv = bconv.toString().toLowerCase();
          }
          if (aconv > bconv) return 1;
          if (aconv < bconv) return -1;
          return 0;
        })
      this.nextOrderStep();
    } else if (this.orderStep === 1){
      this.employeeFilteredList = this.employeeFilteredList
        .sort((a, b) => {
          let aconv = a[field];
          let bconv = b[field];
          if (typeof aconv === 'string'){
            aconv = aconv.toString().toLowerCase();
            bconv = bconv.toString().toLowerCase();
          }
          if (aconv > bconv) return -1;
          if (aconv < bconv) return 1;
          return 0;
        })
      this.nextOrderStep();
    } else if (this.orderStep === 2) {
      this.employeeFilteredList = [...this.employeeList];
      this.nextOrderStep();
    }
  }

  filter = () => {
    const filterText = this.filterText;
    console.log(filterText);
    this.employeeFilteredList = this.employeeList.filter((emp) => {
      let includes = false;
      Object.keys(emp).forEach((key) => {
        if (emp[key as keyof Employee].toString().toLowerCase().trim().includes(filterText.toString().toLowerCase().trim())){
          includes = true;
        }
      })
      return includes;
    })
  };

  deleteEmployee = (emp: Employee) => {
    this.loading = true;
    this.service.deleteEmployee(emp.EmployeeId).subscribe((res) => {
      this.loading = false;
      this.responseMessage = res.toString();
      this.initializeEmpList();
    })
  }

}
