import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../admin/servise/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private _autService: AuthService, private _adminService: AdminServiceService, private activatedRoute:ActivatedRoute) { }
  
  intercept(req, next){
    const url = this.activatedRoute.snapshot['_routerState'].url
    let serviceGetToken: string

    if(url.includes("/admin")){
      serviceGetToken = this._adminService.getToken()
    } else {
      serviceGetToken = this._autService.getToken()
    }
    let tokenReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${serviceGetToken}`
      }
    })
    return next.handle(tokenReq)
  }
}
