import { Component, OnInit, OnChanges } from '@angular/core';
import { Department } from 'src/app/models/Department';
import ApiService from 'src/app/shared/api.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  constructor(private service:ApiService) { }

  faTrash = faTrash;
  faPen = faPen;
  faSort = faSort;
  faSearch = faSearch;

  departmentList: Department[] = [];
  departmentFilteredList: Department[] = [];
  selectedDepartment!: Department;

  loading: boolean = false;
  responseMessage: string = '';

  orderStep: number = 0;
  filterText: string = "";

  ngOnInit(): void {
    this.initializeDepList();
  }

  initializeDepList = () => {
    this.service.getDepList().subscribe((deps) => {
      this.departmentList = [...deps];
      this.departmentFilteredList = [...deps];
    });
  }

  setSelectedDepartment = (dep: Department) => {
    this.selectedDepartment = dep;
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

  order = (field: keyof Department) => {
    if (this.orderStep === 0){
      this.departmentFilteredList = this.departmentFilteredList
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
      this.departmentFilteredList = this.departmentFilteredList
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
      this.departmentFilteredList = [...this.departmentList];
      this.nextOrderStep();
    }
  }

  filter = () => {
    const filterText = this.filterText;
    console.log(filterText);
    this.departmentFilteredList = this.departmentList.filter((dep) => (
      dep.DepartamentoId.toString().toLowerCase().trim().includes(
        filterText.toString().toLowerCase().trim()
      )
      ||
      dep.Departamento.toString().toLowerCase().trim().includes(
        filterText.toString().toLowerCase().trim()
      )
    ));
  }

  deleteDepartment = (dep: Department) => {
    this.loading = true;
    this.service.deleteDepartment(dep.DepartamentoId).subscribe((res) => {
      this.loading = false;
      this.responseMessage = res.toString();
      this.initializeDepList();
    })
  }

}
