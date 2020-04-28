import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';
import { EventService } from '../service/event.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactFormData: Contact = new Contact()
  constructor(private _service: EventService) { }

  ngOnInit(): void {
  }

  contactUs(){
    console.log("ok")
    this._service.sendEmail(this.contactFormData).pipe(take(1)).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
