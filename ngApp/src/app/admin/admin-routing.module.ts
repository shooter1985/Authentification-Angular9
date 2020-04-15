import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminGuard } from './guard/admin.guard';


const routes: Routes = [
  { path: 'login' , component: AdminLoginComponent},
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'dashbord', component: DashbordComponent },
          { path: 'create', component: ManageEventsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
