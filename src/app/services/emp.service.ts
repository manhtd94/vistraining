import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  // url: 'http://localhost:8080/vis/';
  // url1: 'http://localhost:8080/users/';

  // constructor(private http: HttpClient) { }

  // getEmps(): Observable<Employee[]> {
  // tslint:disable-next-line: max-line-length
  //   return this.http.get<Employee[]>(this.url + 'search?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  // }


  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.url + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  // }

}
