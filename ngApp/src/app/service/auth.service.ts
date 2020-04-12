import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user:User){
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user):Observable<any>{
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUser(){
    return localStorage.getItem('user');
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }
}
