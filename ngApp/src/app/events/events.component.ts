import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';
import { take } from 'rxjs/operators';

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
  constructor(private _event: EventService, private router: Router, private route: ActivatedRoute) {
    console.log(new Date())
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));
  }

  private loadPage(page) {
    // get page of items from api
    this._event.getEvents(page).pipe(take(1)).subscribe(
      res => {
              this.pager = res.pager;
              console.log(this.pager)
              this.events = res.events;
      },
      err => console.log(err)

    );
  }

  viewDetails(event){
    this.router.navigate(['./', event._id], { relativeTo: this.route });
  }

  getImage(image){
    return this._event.getImages(image)
    }

}
