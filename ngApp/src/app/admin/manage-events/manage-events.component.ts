import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { AdminServiceService } from '../servise/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit {

  eventData = new Event()
  imageVal = ''
  uploadData = new FormData();
  messageError = ""
  msgError = false
  image: File
  constructor(private _adminService: AdminServiceService, private router: Router) { }

  ngOnInit(): void {
    this.eventData.user = localStorage.getItem('tokenAdmin')
    this.eventData.startDate = new Date().toISOString().split('T')[0];
    this.eventData.endDate = new Date().toISOString().split('T')[0];
  }

  registerEvent(){
    const formData = new FormData()
    formData.append('file',this.image)
    this.eventData.startDate = new Date(this.eventData.startDate)
    this.eventData.endDate = new Date(this.eventData.endDate)
    formData.append('eventData', JSON.stringify(this.eventData))
    this._adminService.saveEvent(formData).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  onFileChanged(event){
    this.imageVal = event.target.files[0].name
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.image = file;
    }
  }

  alertDissmiss(){

  }

}
