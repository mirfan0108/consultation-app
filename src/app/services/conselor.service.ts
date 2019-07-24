import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

const ENV = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ConselorService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${ENV}/conseling`);
  }

  approveComplain(req) {
    console.log(req)
    let form = {
      _id: req._id,
      status: 1,
      title: req.title,
      description: req.description,
      scheduleId: req.scheduleId,
      patientId: req.patientId,
      conselorId: req.conselorId,
      created_on: req.created_on
    }
    return this.httpClient.put(`${ENV}/complaint/${req._id}`,form);
  }
  ignoreComplain() {}
  setToEnd() {}

  postComplain(req) {
    return this.httpClient.post(`${ENV}/complaint`,req);
  }

  getPatientComplain() {
    let storeLocal = localStorage.getItem('_USER');
    let id = JSON.parse(storeLocal)._ID;
    return this.httpClient.get(`${ENV}/complaint/patient/${id}`);
  }

  getComplain() {
    return this.httpClient.get(`${ENV}/complaint`);
  }
  getComplainId(req) {
    return this.httpClient.get(`${ENV}/complaint/${req}`);
  }

}
