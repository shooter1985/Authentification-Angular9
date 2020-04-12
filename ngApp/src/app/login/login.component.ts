import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = new User()
  messageError = ''
  msgError = false
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', res.user.nom)
        this._router.navigate(['/special'])
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
