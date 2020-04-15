import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit {

  registerUserData = new User()
  messageError = ""
  msgError = false
  constructor() { }

  ngOnInit(): void {
  }

  registerEvent(){

  }

  alertDissmiss(){

  }

}
