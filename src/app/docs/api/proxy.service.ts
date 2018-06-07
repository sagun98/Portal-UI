import { DevPortalAPI } from './api.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private http: HttpClient) { }

  public getProxyDefinition (proxyId) {
    return this.http.get(`http://localhost:3000/api/v1/api/${proxyId}`);
  }

  public addApi (api: DevPortalAPI) {
    return this.http.post(`http://localhost:3000/api/v1/api?apikey=12345`, api);
  }

  public updateApi (api: DevPortalAPI) {
    return this.http.put(`http://localhost:3000/api/v1/api/${api.id}?apikey=12345`, api);
  }
}
