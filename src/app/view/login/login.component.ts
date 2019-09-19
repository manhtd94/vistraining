import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { OauthServiceService } from 'src/app/services/oauth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin = false;

  constructor(
    private router: Router,
    private oauth: OauthServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.oauth.login(body.toString()).subscribe(
      data => {
        window.sessionStorage.setItem('token', JSON.stringify(data));
        console.log(window.sessionStorage.getItem('token'));
        console.log(data);
        this.router.navigate(['emps']);
      },
      error => {
        alert(error.error.error_description);
      }
    );
  }
}
