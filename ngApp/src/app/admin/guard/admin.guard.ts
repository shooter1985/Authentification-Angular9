import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from '../servise/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _adminService: AdminServiceService, private _router: Router){

  }

  canActivate(): boolean {
    if(this._adminService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/admin/login'])
      return false
    }
  }
  
}
