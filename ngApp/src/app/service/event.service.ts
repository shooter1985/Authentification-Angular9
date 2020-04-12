import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events?page="
  private _specialEventsUrl = "http://localhost:3000/api/special"

  constructor(private http: HttpClient) { }

  getEvents(page){
    return this.http.get<any>(this._eventsUrl+page);
  }

  getSpecialEvents(){
    return this.http.get<any>(this._specialEventsUrl)
  }
}
