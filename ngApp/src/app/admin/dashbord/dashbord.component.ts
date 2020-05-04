import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  events: any[] = []
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

  query : string
  userQuery = new Subject<string>();
  showModal: boolean = false
  id: string
  constructor(private _event: EventService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));
    
    this.userQuery.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(
      value => this.searchEvent(value)

    )
  }

  search(packageName: string){
    this.userQuery.next(packageName)
  }

  private loadPage(page) {
    this._event.getEventsByUser(page).pipe(take(1)).subscribe(
      res => {
              this.pager = res.pager;
              this.events = res.events;
      },
      err => console.log(err)
    );
  }

  searchEvent(value){
    this._event.searchEvents(value).pipe(take(1))
    .subscribe(
      res => {
        this.pager = res.pager,
        this.events = res.events
      },
      err => {
        console.log(err)
      }
    )
  }

  showModalEvent(id){
    this.showModal = true
    this.id = id
  }

  deleteEvent(){
    this.showModal = false
    this._event.deleteEvent(this.id).pipe(take(1)).subscribe(
      res => {
        for (let i = 0; i < this.events.length; i++) {
          const element = this.events[i]._id;
          if(element === this.id){
            this.events.splice(i, 1)
          }
        }
      },
      err => {
        console.log(err)
      }
    )
  }

    


}
