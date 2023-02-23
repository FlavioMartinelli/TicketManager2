import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Fulldate, time } from '../models/models';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  // f = new FormGroup({
  //   name: new FormControl(''),
  //   last_name: new FormControl(''),
  //   email: new FormControl(''),
  //   tel: new FormControl(null),
  //   date: new FormGroup({
  //     day: new FormControl(null),
  //     time: new FormControl(null)
  //   }),
  //   extras: new FormArray([
  //     new FormGroup({
  //       name: new FormControl(''),
  //       email: new FormControl('')
  //     })
  //   ])
  // })
  // ValidateTimeAvailable(control: AbstractControl) {
    
  //   let t = this.times.find(t=>t.time == control.value)
  //   console.log("test", this.times);
  //   // return null
  //   return !!t ? {['timeNotAvailable']: t.available} : null
  // }


  f = new FormGroup({
    name: new FormControl('Flavio Martinelli', [Validators.required]),
    // last_name: ['', Validators.required],
    email:  new FormControl('flaviofm99@gmail.com', [Validators.required]),
    tel:  new FormControl('123', [Validators.required]),
    fulldate: new FormGroup({
      year: new FormControl((new Date()).getFullYear(), [Validators.required]),
      day: new FormControl((new Date()).getDate(), [Validators.required]),
      month: new FormControl((new Date()).getMonth(), [Validators.required]),
      // time:  new FormControl('11:00', [Validators.required, this.ValidateTimeAvailable])
      time:  new FormControl('11:00', [Validators.required])
    }),
    extras: new FormArray<any>([], Validators.required)
  })
  

  loading = false;

  step = 1

  times:time[] = []

  maxExtras = 5

  constructor(private fb:FormBuilder, private bs:BookingService) {}
  
  ngOnInit(){

    this.bs.timeSUB.subscribe((res)=>{
      console.log(res);
      
      this.times = res
    })

  }

  get totalPrice() {
    return 100 + (30 * this.extras.length)
  }

  getFormControl(name:string) {
    return this.f.get(name) as FormControl
  }

  getExtrasFC(name:string, i:number) {
    return this.extras.controls[i].get(name)! as FormControl
  }

  get extras() {
    return this.f.get("extras") as FormArray
  }

  set month(m:number) {
    console.log(m);
    
    this.f.patchValue({
      fulldate: {...this.f.value.fulldate, month: m}
    })
  }
  set day(d:number) {
    this.f.patchValue({
      fulldate: {...this.f.value.fulldate, day: d}
    })
  }
  set year(y:number) {
    this.f.patchValue({
      fulldate: {...this.f.value.fulldate, year: y}
    })
  }
  set time(t:string) {
    this.f.patchValue({
      fulldate: {...this.f.value.fulldate, time: t}
    })
  }

  get year() {
    return this.f.value.fulldate!.year!;
  }
  get month() {
    return this.f.value.fulldate!.month!;
  }
  get day() {
    return this.f.value.fulldate!.day!;
  }
  get time() {
    return this.f.value.fulldate!.time!;
  }

  get currentDate() {
    return new Date(this.year, this.month, this.day)
  }

  get currentFulldate() {
    return this.f.value.fulldate! as Fulldate
  }

  /*get formControls */
  get yearControl() {
    return this.getFormControl("fulldate")?.get('year') as FormControl
  }
  get dayControl() {
    return this.getFormControl("fulldate")?.get('day') as FormControl
  }
  get monthControl() {
    return this.getFormControl("fulldate")?.get('month') as FormControl
  }
  get timeControl() {
    return this.getFormControl("fulldate")?.get('time') as FormControl
  }

  addExtra() {
    // const g = new FormGroup({
    //   eName: new FormControl(null, [Validators.required]),
    //   eEmail: new FormControl(null, [Validators.required]),
    //   eTel: new FormControl(null, [Validators.required])
    // })
    const g = new FormGroup({
      eName: new FormControl(null, [Validators.required]),
      eEmail: new FormControl(null, [Validators.required]),
      eTel: new FormControl(null,)
    })
    this.extras.push(g)

    this.currentExtra = 0
    
  }

  removeExtra() {
    if(this.extras.length)
    this.extras.removeAt(this.extras.length-1)

    this.currentExtra = 0
  }

  currentExtra = 0

  nextExtra() {
    if(this.currentExtra >= this.extras.length-1) return
    this.currentExtra = this.currentExtra + 1
  }
  prevExtra() {
    if(this.currentExtra == 0) return
    this.currentExtra = this.currentExtra - 1
  }



  submit() {
    console.log(this.f.value);
    this.loading = true;
    this.bs.addPrenotazione(this.f.value).subscribe(res=>{

    })
  }

  next() {
    if(this.step == 4) return
    if(this.step == 2 && this.extras.length == 0) this.step += 2
    else this.step += 1
  }

}
