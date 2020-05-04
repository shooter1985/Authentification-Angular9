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
  private _eventsByUser = `${GlobalConstants.apiURL}event/events_by_user/?page=`
  private _specialEventsUrl = `${GlobalConstants.apiURL}event/special?page=`
  private _searchEvents = `${GlobalConstants.apiURL}event/search_event?query=`
  private _eventGetImageUrl = `${GlobalConstants.apiURL}event/getimage/`
  private _deleteEvent = `${GlobalConstants.apiURL}event/delete/`
  private _contactUrl = `${GlobalConstants.apiURL}event/contact`

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

  getEventsByUser(page): Observable<any>{
    return this.http.get<any>(this._eventsByUser+page)
  }

  searchEvents(query): Observable<any>{
    return this.http.get<any>(this._searchEvents+query)
  }

  deleteEvent(id){
    return this.http.delete<Event>(this._deleteEvent+id)
  }

  sendEmail(contact){
    return this.http.post<string>(this._contactUrl, contact)
  }
}
