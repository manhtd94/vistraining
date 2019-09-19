import {EmployeeResponse} from './../../../model/emp';
import {Department} from './../../../model/dept';
import {Component, OnInit} from '@angular/core';
import {OauthServiceService} from 'src/app/services/oauth-service.service';
import {Router} from '@angular/router';
import {Employee} from 'src/app/model/employee';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe]
})
export class CreateComponent implements OnInit {

  depts: Department[] = [];
  emps: EmployeeResponse[] = [];
  newEmployees: Employee;
  dateHire = new Date();

  constructor(private oau: OauthServiceService,
              private router: Router,
              public datePipe: DatePipe) {
  }

  ngOnInit() {
    this.newEmployees = new Employee();
    this.newEmployees.dept = new Department();

    this.oau.getDepts().subscribe(data => {
      this.depts = data;
      console.log(this.depts);
    });

    this.oau.getAll().subscribe(data => {
      this.emps = data;
      console.log(this.emps);
    });

  }

  createEmp() {

    for (const dept of this.depts) {
      if (dept.deptNo === Number(this.newEmployees.dept.deptNo)) {
        this.newEmployees.dept = dept;
      }
    }

    this.newEmployees.hireDate = this.datePipe.transform(this.dateHire, 'dd-MM-yyyy');
    console.log(this.newEmployees);

    this.oau.createEmp(this.newEmployees).subscribe(data => {
      this.router.navigate(['emps']);
    });
  }

}
