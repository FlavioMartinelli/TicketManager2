import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent
  },
  {
    path: 'auth',
    loadChildren: ()=>import("./auth/auth.module").then(m=>m.AuthModule)
  },
  {
    path: 'backoffice',
    loadChildren: ()=>import("./backoffice/backoffice.module").then(m=>m.BackofficeModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
