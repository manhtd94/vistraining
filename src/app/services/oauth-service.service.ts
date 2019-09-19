import { Department } from './../model/dept';
import { SearchForm } from './../model/search';
import { EmployeeResponse } from './../model/emp';
import { User } from './../model/user';
import { config } from './../config/application.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from '../model/employee';
// import * as jwt_decode from 'jwt-decode';
// import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class OauthServiceService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  url = 'http://localhost:9191/';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  // public getToken() {
  //   return sessionStorage.getItem('token');
  // }

  // public isAuthenticated(): boolean {
  //   const token = this.getToken();

  //   return tokenNotExpired(token);
  // }

  login(loginPayload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': config.contentType,
        // tslint:disable-next-line: object-literal-key-quotes
        Authorization: config.requestAuthorization
      })
    };

    return this.http.post(
      'http://localhost:9191/' + 'oauth/token',
      loginPayload,
      httpOptions
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.url +
        'users?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }

  // , page: Pager
  getEmps(searchForm: SearchForm): Observable<EmployeeResponse[]> {
    let urlEmp = this.url + 'vis/search?';

    // if (!page) {
    //   page = new Pager();
    // }

    // urlEmp = urlEmp + 'pageNo=' + page.page + '&pageSize=' + page.pageSize;

    urlEmp = urlEmp + '1=1';

    if (searchForm.empName && searchForm.empName !== '') {
      urlEmp = urlEmp + '&name=' + searchForm.empName;
    }

    if (searchForm.empNo) {
      urlEmp = urlEmp + '&id=' + searchForm.empNo;
    }

    // tslint:disable-next-line: triple-equals
    if (searchForm.deptNo && searchForm.deptNo != 0) {
      urlEmp = urlEmp + '&dept=' + searchForm.deptNo;
    }

    // tslint:disable-next-line: triple-equals
    if (searchForm.mngNo && searchForm.deptNo != 0) {
      urlEmp = urlEmp + '&mrg=' + searchForm.mngNo;
    }

    if (searchForm.salFrom) {
      urlEmp = urlEmp + '&salFrom=' + searchForm.salFrom;
    }

    if (searchForm.salTo) {
      urlEmp = urlEmp + '&salTo=' + searchForm.salTo;
    }

    console.log(urlEmp);
    return this.http.get<EmployeeResponse[]>(
      urlEmp
      // +
      //   '&access_token=' +
      //   JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }

  getAll(): Observable<EmployeeResponse[]> {
    const linkAPI = 'http://localhost:9191/vis/search?';
    return this.http.get<EmployeeResponse[]>(
      linkAPI
      //  +
      //   '&access_token=' +
      //   JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }

  getDepts(): Observable<Department[]> {
    const urlDept = this.url + 'vis/depts';
    return this.http.get<Department[]>(
      urlDept
      // +
      //   '?access_token=' +
      //   JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }

  createEmp(newEmp: Employee): Observable<Employee> {
    const linkAPI = 'http://localhost:9191/vis/employees?';
    // tslint:disable-next-line: max-line-length
    return this.http.post<Employee>(
      linkAPI +
        'access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token,
      newEmp
    );
  }

  getEmp(id: number): Observable<Employee> {
    const linkAPI = 'http://localhost:9191/vis/employees/' + id;
    return this.http.get<Employee>(
      linkAPI +
        '?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token
    );
  }

  editEmp(emp: Employee): Observable<Employee> {
    const linkAPI = 'http://localhost:9191/vis/employees/' + emp.empNo;
    return this.http.put<Employee>(linkAPI + '?access_token=' +
      JSON.parse(window.sessionStorage.getItem('token')).access_token, emp);
  }

  deleteEmp(idEmp: number): Observable<Employee> {
    const linkAPI = 'http://localhost:9191/vis/employees/' + idEmp;
    return this.http.delete<Employee>(linkAPI + '?access_token=' +
      JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
}
