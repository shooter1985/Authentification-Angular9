import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = []
  constructor(private _event: EventService) { }

  ngOnInit(): void {
    this._event.getEvents().subscribe(
      events => this.events = events,
      err => console.log(err)
    )
  }

}
