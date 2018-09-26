import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApigeeClientService {

  constructor(
    private http : HttpClient
  ) { }

  public getApigeeProducts(org: string) : Observable<string[]> {
    return <Observable<string[]>> this.http.get(`${environment.restBase}/apigee/products`);
  }

  public getApigeeApis(org: String) : Observable<string[]> {
    return  <Observable<string[]>> this.http.get(`${environment.restBase}/apigee/apis`);
  }
}
