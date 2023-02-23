import { Component, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false
  constructor(private as:AuthService, private r:Router){}

  submit(f:NgForm) {
    this.loading = true
    console.log(f.value);
    
    this.as.login(f.value).subscribe((res)=>{
      this.r.navigateByUrl("/backoffice")
    })
  }

}
