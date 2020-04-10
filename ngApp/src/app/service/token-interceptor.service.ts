import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private _autService: AuthService) { }
  
  intercept(req, next){
    let tokenReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${this._autService.getToken()}`
      }
    })
    return next.handle(tokenReq)
  }
}
