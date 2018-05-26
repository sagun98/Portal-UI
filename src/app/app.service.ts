import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AppService {

  constructor(private http : HttpClient) { }

  public getProducts() {
    return this.http.get('http://localhost:3080/api/products');
  }

  public getAPIs(){
    return this.http.get('http://localhost:3080/api/apis');
  }
}
