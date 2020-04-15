import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../servise/admin-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _adminService: AdminServiceService) { }

  ngOnInit(): void {
  }

  logout(){
    this._adminService.logoutUser()
  }

}
