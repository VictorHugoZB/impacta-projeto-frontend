import { Component, OnInit } from '@angular/core';
import ApiService from 'src/app/shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private service:ApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  id = this.actRoute.snapshot.params['id']
  currentDepartment!: Department;

  response:string = '';
  depName:string = '';

  ngOnInit(): void {
    this.service.getDep(this.id).subscribe((dep) => {
      this.currentDepartment = dep;
      this.depName = dep.Departamento;
    })
  }

  updateDepartment = () => {
    if (!this.depName) return;
    let dep: Department = {
      DepartamentoId: this.currentDepartment.DepartamentoId,
      Departamento: this.depName
    }
    this.service.updateDepartment(dep).subscribe((res) => {
      this.response = res.toString();
    })
  }

  close = () => {
    this.response = '';
    this.router.navigateByUrl('/department');
  }

}
