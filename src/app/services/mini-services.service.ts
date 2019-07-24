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
}
