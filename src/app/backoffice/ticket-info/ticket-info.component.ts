import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketInfo } from 'src/app/models/models';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent {
[x: string]: any;
  @Input() ticket:TicketInfo|null = null;

  @Output() validateEvent = new EventEmitter<boolean>()

  @Output() closeEvent = new EventEmitter()

  get currentDate() {
    return new Date(this.ticket!.date.year, this.ticket!.date.day, this.ticket!.date.month)
  }

  validate(b:boolean){
    this.validateEvent.emit(b)
  }

  close() {
    this.closeEvent.emit()
  }
}
