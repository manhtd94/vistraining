import { CreateTimeOffComponent } from './view/emp/timeoff/create/create.component';
import { LoginComponent } from './view/login/login.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './view/emp/search/search.component';
import { CreateComponent } from './view/emp/create/create.component';
import { EditComponent } from './view/emp/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'emps', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'time-off', component: CreateTimeOffComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
