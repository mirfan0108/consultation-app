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
export class SchedulerService {

  constructor(private  httpClient:  HttpClient) { }

  getSchedule(date) {
    return this.httpClient.get(`${ENV}/schedule`, date);
  }

  getScheduleByDate(date) {
    return this.httpClient.get(`${ENV}/schedule/${date}`);
  }

  setSchedule(form){
    return this.httpClient.post(`${ENV}/schedule`, form);
  }

  getConseling() {
    return this.httpClient.get(`${ENV}/conseling/patient/${localStorage.getItem('_ID')}`)
  }

  getScheduleConseling(scheduleId) {
    return this.httpClient.get(`${ENV}/schedule/conseling/${scheduleId}`);
  }

}
