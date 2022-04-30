import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import ApiService from './shared/api.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button/button.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './components/department/add/add.component';
import { RouterModule } from '@angular/router';
import { EditComponent } from './components/department/edit/edit.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ButtonComponent,
    DepartmentComponent,
    EmployeeComponent,
    AddComponent,
    EditComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
