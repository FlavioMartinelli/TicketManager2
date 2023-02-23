import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';

export interface AuthData {
  accessToken: string,
  user: {
    id: number,
    username: string
  }
}

export interface loginData {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSUB = new BehaviorSubject<null|AuthData>(null)

  loginOBS = this.authSUB.asObservable()
  isLogged = this.authSUB.asObservable().pipe(map(res=>!!res))

  constructor(private http:HttpClient) {
    this.autologin()
  }

  login(data:loginData) {
    return this.http.post<AuthData>("/login", data).pipe(
      tap((res)=>{
        if(res.accessToken) {
          localStorage.setItem("token", res.accessToken)
          this.authSUB.next(res)
        } else {
          this.authSUB.next(null)
        }
      }))
  }

  autologin() {
    let t = localStorage.getItem("token")
    //TODO -> redirect to backoffice
  }
}
