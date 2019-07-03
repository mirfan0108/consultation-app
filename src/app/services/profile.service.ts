import { Injectable } from '@angular/core';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { AuthResponse } from  '../auth/auth-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
const ENV = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private  httpClient:  HttpClient) { }

  getProfile(userId) {
    console.log(userId)
    return this.httpClient.get(`${ENV}/profile/${userId}`);
  }

  updateProfile(profile: any) {
    return this.httpClient.put(`${ENV}/profile/${profile._id}`, profile)
  }

}
