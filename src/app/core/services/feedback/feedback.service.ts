import { APIRequest } from './../../interfaces/api-request.interface';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  public sendAPIRequest (apiRequest: APIRequest) : Observable<boolean> {
    return <Observable<boolean>> this.http.post(`${environment.restBase}/apis/request`, apiRequest);
  }
}
