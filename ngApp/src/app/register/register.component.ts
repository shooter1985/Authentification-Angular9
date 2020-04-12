import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = new User();
  messageError = ''
  msgError = false
  
  constructor(private _auth: AuthService, private _router:Router) { }
  
  ngOnInit(): void {
  }

  registerUser(){
    console.log(this.registerUserData)
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('user',res.registerUser.nom)
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
