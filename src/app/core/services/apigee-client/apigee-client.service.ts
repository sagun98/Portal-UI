import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../docs/product/interfaces/product.interface';
import { ApigeeApiKey } from '../../interfaces/apigee-api-key.interface';

@Injectable({
  providedIn: 'root'
})
export class ApigeeClientService {

  constructor(
    private http : HttpClient
  ) { }

  public getApigeeProducts(org: string) : Observable<string[]> {
    return <Observable<string[]>> this.http.get(`${environment.restBase}/apigee/${org}/products`);
  }

  public getApigeeApis(org: String) : Observable<string[]> {
    return  <Observable<string[]>> this.http.get(`${environment.restBase}/apigee/${org}/apis`);
  }

  public getApiKey(org: string, product: Product, apiName?: string) : Observable<ApigeeApiKey> {
    let params = new HttpParams();
    
    if(apiName)
      params = params.append("apiName", apiName);

    return <Observable<ApigeeApiKey>> this.http.get(`${environment.restBase}/apigee/${org}/developer/app/${product.apiManagementTool.id}`, {params});
  }
}

export class MockApigeeClientService extends ApigeeClientService {

  constructor(
    private _http : HttpClient
  ) { 
    super(_http);
  }

  public getApigeeProducts(org: string) : Observable<string[]> {
    return <Observable<string[]>> of(['Product 1', 'Product 2', 'Product 3']);
  }

  public getApigeeApis(org: String) : Observable<string[]> {
    return <Observable<string[]>> of(['Proxy 1', 'Proxy 2', 'Proxy 3']);
  }
}