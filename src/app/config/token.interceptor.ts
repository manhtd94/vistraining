// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { OauthServiceService } from '../services/oauth-service.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(public auth: OauthServiceService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${this.auth.getToken()}`
//       }
//     });

//     return next.handle(request);
//   }
// }
