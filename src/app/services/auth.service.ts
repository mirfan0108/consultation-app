import { Injectable } from '@angular/core';
// import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { User } from  '../auth/user';
import { AuthResponse } from  '../auth/auth-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  authSubject  =  new  BehaviorSubject(false);
  
  constructor(private  httpClient:  HttpClient) { }


  register(newUser: any) {
    console.log(newUser)
    let form = new FormData();
    form.append("avatar", newUser.avatar, newUser.avatar.name);
    form.append("email", newUser.email);
    form.append("role", newUser.role);
    form.append("password", newUser.password);
    form.append("name", newUser.name);
    form.append("hp", newUser.hp);
    form.append("gender", newUser.gender);
    form.append("birth", newUser.birth);
    form.append("address", newUser.address);
    
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/regist`, form).pipe(
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
      tap(async (res: any) => {
        let user = res[0];
        if (user._id) {
          if(user._id) {
            await localStorage.setItem("_USER", JSON.stringify({_ID: user._id, role:user.role}));
            // await localStorage.setItem("role", user.role);
            this.authSubject.next(true);

          }
        }
      })
    );
  }

  uploadAvatar(avatar: File) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/encrypted',
      })
    };
    let form = new FormData();
    form.append("avatar", avatar, avatar.name);
    return this.httpClient.post(`http://localhost:8080/api`, form)
      .pipe(
        tap(async res => res)
      )
  }

  deleteAvatar(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.httpClient.delete(`https://beckend-conseling.herokuapp.com/api/image/`+name)
      .pipe(
        tap(async res => res)
      )
  }
  
  async logout() {
    localStorage.clear()
    this.authSubject.next(false);
  }

  isLoggedIn() {
    if(localStorage.getItem('_USEER')) {
      return true;      
    }
    return false;
  }
}
