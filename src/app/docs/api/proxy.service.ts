import { DevPortalAPI } from './api.model';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { isNull } from 'util';


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

    if(!api.id || ! api.id.length)
      delete api.id;

    if(api.swagger)
      api.swagger = JSON.stringify( api.swagger );

    let apiFormData:FormData = this.getFormDataFromObject(api);

    const request = this.http.post(`http://localhost:8080/apis`, apiFormData).pipe(tap( (addedApi : DevPortalAPI) => {
      // Emit ApiListChanged event
      this.$onApiListChanged.next({
        action : CRUD.CREATE,
        api : addedApi
      });
    }));

    return request;
  }

  public updateApi (api: DevPortalAPI) {
    if(api.swagger)
      api.swagger = JSON.stringify( api.swagger );

    let apiFormData:FormData = this.getFormDataFromObject(api);

    const request = this.http.put(`http://localhost:8080/apis/${api.id}`, apiFormData).pipe(tap( (addedApi : DevPortalAPI) => {
      // Emit ApiListChanged event
      this.$onApiListChanged.next({
        action : CRUD.UPDATE,
        api : addedApi
      });
    }));

    return request;
  }

  public getApiList(){
    return this.http.get('http://localhost:8080/apis');
  } 

  // Convert object to form data
  private getFormDataFromObject (obj: any) : FormData {
    let formData:FormData = new FormData();

    Object.keys( obj ).forEach(key => {
      let value = obj[key];

      if( isNull( value ) )
        value = '';

      formData.append(key, value);
    });

    return formData;
  }
}