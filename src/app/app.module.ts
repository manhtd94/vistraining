import { config } from './config/application.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './view/emp/search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateComponent } from './view/emp/create/create.component';
import { EditComponent } from './view/emp/edit/edit.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateTimeOffComponent } from './view/emp/timeoff/create/create.component';
// import { TokenInterceptor } from './../app/config/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    CreateComponent,
    EditComponent,
    CreateTimeOffComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
