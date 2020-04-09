import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';


@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = []
  constructor(private _event: EventService) { }

  ngOnInit(): void {
    this._event.getSpecialEvents().subscribe(
      specialsEvents => this.specialEvents = specialsEvents,
      err => console.log(err) 
    )
  }

}
