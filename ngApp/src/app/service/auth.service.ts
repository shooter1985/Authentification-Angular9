import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = `${GlobalConstants.apiURL}api/register`
  private _loginUrl = `${GlobalConstants.apiURL}api/login`
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
