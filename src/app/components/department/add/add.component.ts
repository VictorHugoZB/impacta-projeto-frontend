import { Component, OnInit } from '@angular/core';
import ApiService from 'src/app/shared/api.service';
import { Department } from 'src/app/models/Department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private service:ApiService, private router: Router) { }

  response:string = '';
  depName:string = '';

  ngOnInit(): void {
  }

  addDepartment = () => {
    if (!this.depName) return;
    let dep: Department = {
      DepartamentoId: 0,
      Departamento: this.depName
    }
    this.service.addDepartment(dep).subscribe((res) => {
      this.response = res.toString();
    })
  }

  close = () => {
    this.response = '';
    this.router.navigateByUrl('/department');
  }

}
