import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { time } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  timeSUB = new ReplaySubject<time[]>()
  // time = this.timeSUB.asObservable()
  
  constructor(private http:HttpClient) {
    //TODO http instead of arrbitrary
    this.timeSUB.next([
      {time: '9:00', available: true},
      {time: '10:00', available: true},
      {time: '11:00', available: false},
      {time: '12:00', available: true},
      {time: '13:00', available: true},
      {time: '14:00', available: true},
      {time: '15:00', available: true},
      {time: '16:00', available: false},
      {time: '17:00', available: true},
      {time: '18:00', available: true},
      {time: '19:00', available: true},
      {time: '20:00', available: true}
    ])
  }


  //TODO addPrenotazione(data: bookingData) {
  addPrenotazione(data: any) {
    return this.http.post("/addBooking", data)
  }

  get times() {
    return this.timeSUB.asObservable()
  }

  checkTimes(d: Date) {
    //TODO: lettura tempi disponibili in base a data
    this.timeSUB.next([
      {time: '9:00', available: Math.random() > .5},
      {time: '10:00', available: Math.random() > .5},
      {time: '11:00', available: Math.random() > .5},
      {time: '12:00', available: Math.random() > .5},
      {time: '13:00', available: Math.random() > .5},
      {time: '14:00', available: Math.random() > .5},
      {time: '15:00', available: Math.random() > .5},
      {time: '16:00', available: Math.random() > .5},
      {time: '17:00', available: Math.random() > .5},
      {time: '18:00', available: Math.random() > .5},
      {time: '19:00', available: Math.random() > .5},
      {time: '20:00', available: Math.random() > .5}
    ])
  }
}
