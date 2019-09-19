import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {EmployeeResponse} from '../../../model/emp';
import {Department} from '../../../model/dept';
import {Component, OnInit} from '@angular/core';
import {Employee} from 'src/app/model/employee';
import {OauthServiceService} from 'src/app/services/oauth-service.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../config/appdate';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
})
export class EditComponent implements OnInit {

  depts: Department[] = [];
  emps: EmployeeResponse[] = [];
  editEmp: Employee;
  hireDate: Date;

  constructor(private oau: OauthServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {
  }

  ngOnInit() {

    this.editEmp = new Employee();
    this.editEmp.dept = new Department();

    this.activatedRoute.paramMap.subscribe((pram: ParamMap) => {
      this.editEmp.empNo = Number(pram.get('id'));
    });

    this.oau.getEmp(this.editEmp.empNo).subscribe(data => {
      this.editEmp = data;
      console.log(this.editEmp);
      this.hireDate = new Date(this.editEmp.hireDate);
      this.datePipe.transform(this.hireDate, 'MM-dd-yyyy');
    });

    this.oau.getDepts().subscribe(data => {
      this.depts = data;
    });

    this.oau.getAll().subscribe(data => {
      this.emps = data;
    });

    // const dateSendingToServer = new DatePipe('en-US').transform(this.editEmp.hireDate, 'dd-MM-yyyy');
    // console.log(dateSendingToServer);
  }

  edit() {
    this.editEmp.hireDate = this.datePipe.transform(this.hireDate, 'dd-MM-yyyy');
    console.log(this.editEmp.hireDate);
    this.oau.editEmp(this.editEmp).subscribe(data => {
      this.router.navigate(['emps']);
    });
  }

}
