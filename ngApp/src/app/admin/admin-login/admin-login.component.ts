import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AdminServiceService } from '../servise/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginUserData = new User()
  msgError = false
  messageError = ''
  constructor(private _adminService: AdminServiceService, private _router: Router) { }

  ngOnInit(): void {
    if(this._adminService.loggedIn)
    {
      this._router.navigate(['/admin'])
    }
  }

  loginUser(){
    this._adminService.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('tokenAdmin', res.token)
        this._router.navigate(['/admin'])
      },
      err => {
        this.msgError = true
        this.messageError = err.error
      }
    )
  }

  alertDissmiss(){
    this.msgError = false;
  } 

}
