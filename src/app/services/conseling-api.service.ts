import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

const ENV = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ConselingApiService {

  constructor(private httpClient: HttpClient) { }

  getPatientConseling(id) {
    
    return this.httpClient.get(`${ENV}/conseling/patient/${id}`);
  }

  getScheduleConseling(id) {
    return this.httpClient.get(`${ENV}/schedule/conselings/${id}`);
  }
}
