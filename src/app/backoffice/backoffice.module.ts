import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { CheckingComponent } from './checking/checking.component';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from '../booking/booking.component';
import { WebcamModule } from 'ngx-webcam';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanComponent } from './scan/scan.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';

const routes:Routes = [
  {
    path: '',
    component: BackofficeComponent
  },
  {
    path: 'checking',
    component: CheckingComponent
  }
]

@NgModule({
  declarations: [
    BackofficeComponent,
    CheckingComponent,
    ScanComponent,
    TicketInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WebcamModule,
    ZXingScannerModule
  ],
  exports: [
    RouterModule
  ]
})
export class BackofficeModule { }
