import { DevPortalAPI } from './api.model';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


// TODO: Move this into a separate file
export interface APIListChange {
  action : string,
  api : DevPortalAPI
}

// TODO: Move to separate file
export enum CRUD {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

// TODO:
// Refactor this to be ApiService
// Move to Application level service folder
// Refactor out REST_BASE to be environmentally set

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  public $onApiListChanged: Subject<APIListChange> = new Subject<APIListChange>()

  constructor(private http: HttpClient) { }

  public getProxyDefinition (proxyId) {
    return this.http.get(`http://localhost:8080/apis/${proxyId}`);
  }

  public addApi (api: DevPortalAPI) {

    const request = this.http.post(`http://localhost:8080/apis`, api).pipe(tap( (addedApi : DevPortalAPI) => {
      // Emit ApiListChanged event
      this.$onApiListChanged.next({
        action : CRUD.CREATE,
        api : addedApi
      });
    }));

    return request;
  }

  public updateApi (api: DevPortalAPI) {
    return this.http.put(`http://localhost:8080/apis/${api.id}`, api).pipe(tap( (addedApi : DevPortalAPI) => {
      // Emit ApiListChanged event
      this.$onApiListChanged.next({
        action : CRUD.UPDATE,
        api : addedApi
      });
    }));
  }

  public getApiList(){
    return this.http.get('http://localhost:8080/apis');
  } 
}