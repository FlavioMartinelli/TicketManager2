import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fulldate, time } from 'src/app/models/models';
import { BookingService} from '../../booking.service';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent {

  @Output() dayPicked = new EventEmitter<number>()
  @Output() monthPicked = new EventEmitter<number>()
  @Output() yearChanged = new EventEmitter<number>()
  @Output() timePicked = new EventEmitter<string>()

  @Input() fulldate:Fulldate = {
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth(),
    day: (new Date()).getDate(),
    time: "9:00"
  }

  @Input() times:time[] = []

  constructor(private bs:BookingService) {}

  ngOnInit() {
  }

  prevMonth(){
    let m = this.fulldate.month - 1
    if(this.fulldate.month < 1) {
      m += 12
      this.year = this.fulldate.year - 1
    }
    this.month = m
    this.day = 1
  }

  nextMonth(){
    let m = this.fulldate.month + 1
    if(this.fulldate.month > 12) {
      m -= 12
      this.year = this.fulldate.year + 1
    }
    this.month = m
    this.day = 1
  }

  set month(n:number){
    this.monthPicked.emit(n)
  }
  set year(n:number){
    this.yearChanged.emit(n)
  }
  set day(n:number) {
    this.dayPicked.emit(n)
    this.bs.checkTimes(this.currentDate)
  }

  set time(t:string) {
    // this.fulldate.time = t
    this.timePicked.emit(t)
  }

  get currentDate() {
    return new Date(this.fulldate.year, this.fulldate.month, this.fulldate.day)
  }

  get daysOfMonth() {
    // let d = new Date(this.fulldate.year, this.fulldate.month, 0)

    // let dim = d.getDate()
    // let starting = d.getDay() + (dim % 7)
    // if (starting > 6) starting -= 6
    // let res = Array(starting + dim).fill(null, 0, starting)
    // res.fill(true, starting)
    return this.getDaysByMonth(this.fulldate.month)
  }

  getDaysByMonth(m:number) {
    let d = new Date(this.fulldate.year, this.fulldate.month+1, 0)

    let dim = d.getDate()
    let starting = d.getDay() + (dim % 7)
    if (starting >= 6) starting -= 6
    let res = Array(starting + dim).fill(null, 0, starting)
    res.fill(true, starting)
    return [...Array(starting).fill(false), ...Array(dim+1).fill(true).keys(), ...Array(this.getRemainingDays(starting, dim)).fill(null)]
  }

  getRemainingDays(s:number, d:number) {
    let ds = s + d+1
    return (Math.ceil(ds / 7) * 7) - ds
  }

}


/*
[(starting + dim) + x] / 7 = 0

*/