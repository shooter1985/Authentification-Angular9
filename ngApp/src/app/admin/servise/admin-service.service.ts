import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/models/Event';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _saveEvent = "http://localhost:3000/event/save"
  constructor(private http: HttpClient, private _router: Router) { }

  loginUser(user):Observable<any>{
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('tokenAdmin')
  }

  getToken(){
    return localStorage.getItem('tokenAdmin')
  }

  logoutUser(){
    localStorage.removeItem('tokenAdmin')
    this._router.navigate(['/admin/login'])
  } 

  saveEvent(event){
    return this.http.post<Event>(this._saveEvent,event)
  }

}
