import { Department } from './../../../model/dept';
import { SearchForm } from './../../../model/search';
import { User } from './../../../model/user';
import {  EmployeeResponse } from './../../../model/emp';
import { Component, OnInit } from '@angular/core';
import { EmpService } from 'src/app/services/emp.service';
import { OauthServiceService } from 'src/app/services/oauth-service.service';
import { Pager } from 'src/app/model/page';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  employees: EmployeeResponse[];
  searchForm: SearchForm;
  page: Pager;
  totalpage: number;
  config: any;

  depts: Department[] = [];
  emps: EmployeeResponse[] = [];

  p = 1;

  constructor(
    private oau: OauthServiceService
  ) {}

  ngOnInit() {
    // if (!window.sessionStorage.getItem('token')) {
    // }
    this.searchForm = new SearchForm();
    this.getEmployees();

    this.oau.getDepts().subscribe(data => {
      this.depts = data;
    });

    this.oau.getAll().subscribe(data => {
      this.emps = data;
    });

  }

  getEmployees() {
    this.oau.getEmps(this.searchForm).subscribe(data => {
      this.employees = data;
      // this.employees.forEach(element => {
      //   //  element.hireDate = new DatePipe();
      // });
    });
  }

  search() {
    this.getEmployees();
  }

  pageChanged(event) {
    this.oau.getEmps(this.searchForm).subscribe(data => {
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: data.length
      };
      console.log(data.length);
      this.config.currentPage = event;
    });
  }

  delEmp(id) {

  }

}
