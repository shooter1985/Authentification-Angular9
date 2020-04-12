import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = []
  pager = {
    totalItems: 10,
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
    startPage: 1,
    endPage: 1,
    startIndex: 0,
    endIndex: 9,
    pages: [ 1 ]
  }
  constructor(private _event: EventService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));
  }

  private loadPage(page) {
    // get page of items from api
    this._event.getEvents(page).subscribe(
      res => {
              this.pager = res.pager;
              console.log(this.pager)
              this.events = res.events;
      },
      err => console.log(err)

    );
  }

}
