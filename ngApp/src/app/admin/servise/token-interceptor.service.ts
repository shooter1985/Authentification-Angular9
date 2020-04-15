import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AdminServiceService } from './admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _adminService: AdminServiceService) { }

  intercept(req, next){
    let tokenReq = req.clone({
      setHeaders: {
        Authorisation : `Bearer ${this._adminService.getToken()}` 
      }
    })
    return next.handle(tokenReq)
  }
}
