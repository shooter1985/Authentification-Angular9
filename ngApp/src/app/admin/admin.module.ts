import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [AdminComponent, DashbordComponent, ManageEventsComponent, AdminLoginComponent],
  providers: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class AdminModule {
  constructor( private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('fr');
  }
}
