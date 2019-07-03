import { Injectable } from '@angular/core';
// import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { User } from  '../auth/user';
import { AuthResponse } from  '../auth/auth-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'https://beckend-conseling.herokuapp.com';
  authSubject  =  new  BehaviorSubject(false);
  
  constructor(private  httpClient:  HttpClient) { }


  register(newUser: any) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/regist`, newUser).pipe(
      tap(async (res:  AuthResponse ) => {
        let user = res[0]
        if (user._id) {
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: any): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        let user = res[0];
        if (user._id) {
          localStorage.setItem("_ID", user._id);
          await localStorage.setItem("_ID", user._id);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    localStorage.clear()
    this.authSubject.next(false);
  }

  isLoggedIn() {
    if(localStorage.getItem('_ID')) {
      return true;      
    }
    return false;
  }
}
