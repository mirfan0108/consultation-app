import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { Categories } from '../_types/categories';
import { tap, catchError } from 'rxjs/operators';
import { ResponseCategories } from '../_types/response-format';

const ENV = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class MiniServicesService {

  constructor(private httpClient: HttpClient) {

  }
  

  getCategories(): Observable<ResponseCategories> {
    return this.httpClient.get<ResponseCategories>(`${ENV}/category`)
    
    
  }

  getCategory(req) {
    return this.httpClient.get(`${ENV}/category/${req}`);
  }

  setWeekly(req) {
    return this.httpClient.post(`${ENV}/schedule/weekly`, req)
  }
  putWeekly(req) {
    return this.httpClient.put(`${ENV}/schedule/weekly/${req.conselor_id}`, req)
  }
  getWeekly(id) {
    return this.httpClient.get(`${ENV}/schedule/weekly/${id}`)
  }

  createConseling(req) {
    return this.httpClient.post(`${ENV}/conseling`, req)
  }

  declineComplaint(req) {
    return this.httpClient.post(`${ENV}/complaint/decline`, req)
  }
  getDeclineComplaint(id) {
    return this.httpClient.get(`${ENV}/complaint/decline/${id}`)
  }

  getMessages(id) {
    return this.httpClient.get(`${ENV}/chat/room/${id}`)
  }
  sendMessage(req) {
    return this.httpClient.post(`${ENV}/chat/room`, req)
  }
}
