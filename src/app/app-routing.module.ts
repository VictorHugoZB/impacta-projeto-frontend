import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddComponent } from './components/department/add/add.component';
import { EditComponent } from './components/department/edit/edit.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';

const routes: Routes = [
  {path: 'employee', component: EmployeeComponent},
  {path: 'department', component: DepartmentComponent},
  {path: 'add-department', component: AddComponent},
  {path: 'edit-department/:id', component: EditComponent},
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: 'edit-employee/:id', component: EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
