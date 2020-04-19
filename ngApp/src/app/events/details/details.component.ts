import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  eventDetail: Event = new Event()
  event$: Observable<Event>
  constructor(private route: ActivatedRoute, private router: Router,private _eventService: EventService) { }

  ngOnInit() {

    /*let id = this.route.snapshot.paramMap.get('id');
  this._eventService.getDetailEvent(id).subscribe(
    res => {
      this.eventDetail = res
    },
    err => {
      console.log(err)
    }
  )*/

    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._eventService.getDetailEvent(params.get('id')))
    )
    this.event$.subscribe(
      res => {
        this.eventDetail = res
      },
      err => {
        console.log(err)
      }
    )
  }

  getImage(image){
    return this._eventService.getImages(image)
  }

}
