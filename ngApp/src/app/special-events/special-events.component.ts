import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = []
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
  constructor(private _event: EventService, private _router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));
  }

  private loadPage(page) {
    // get page of items from api
    this._event.getSpecialEvents(page).subscribe(
      res => {
              this.pager = res.pager;
              this.specialEvents = res.events;
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/login'])
          }
        }
      }

    );
  }

}
