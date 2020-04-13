import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:3000/event/events?page="
  private _specialEventsUrl = "http://localhost:3000/event/special?page="

  constructor(private http: HttpClient) { }

  getEvents(page){
    return this.http.get<any>(this._eventsUrl+page);
  }

  getSpecialEvents(page){
    return this.http.get<any>(this._specialEventsUrl+page)
  }
}
