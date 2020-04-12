import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private _authService: AuthService, private _router: Router){

  }

  ngOnInit(){
  }
  isloggedIN(){
    return this._authService.loggedIn();
  }

  getUserName(){
    return this._authService.getUser();
  }

  logout(){
    this._authService.logoutUser()
  }

  
}
