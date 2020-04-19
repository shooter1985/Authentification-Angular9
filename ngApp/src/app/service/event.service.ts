import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/Event';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = `${GlobalConstants.apiURL}event/events?page=`
  private _eventsDetail = `${GlobalConstants.apiURL}event/events/`
  private _specialEventsUrl = `${GlobalConstants.apiURL}event/special?page=`
  private _eventGetImageUrl = `${GlobalConstants.apiURL}event/getimage/`

  constructor(private http: HttpClient) { }

  getEvents(page){
    return this.http.get<any>(this._eventsUrl+page);
  }

  getSpecialEvents(page){
    return this.http.get<any>(this._specialEventsUrl+page)
  }

  getDetailEvent(id): Observable<Event>{
    return this.http.get<Event>(this._eventsDetail+id)
  }

  getImages(image){
    if(image) 
      return `${GlobalConstants.apiURL}${image}`
    else 
      return "../assets/images/event1.jpeg"
  }
}
