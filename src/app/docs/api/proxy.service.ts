import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private http: HttpClient) { }

  public getProxyDefinition (proxyId) {
    return this.http.get(`http://localhost:3000/api/v1/proxy-document/${proxyId}`);
  }

  public setProxyDefinition (proxyId, proxyDef) {
    return this.http.put(`http://localhost:3000/api/v1/proxy-document/${proxyId}?apikey=12345`, proxyDef);
  }
}
