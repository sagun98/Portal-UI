import { environment } from './../../../environments/environment';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { isNull } from 'util';
import { CRUD } from '../../core/enums/crud.enum';
import { APIListChange } from './interfaces/apiListChange.interface';
import { API } from './interfaces/api.interface';

// TODO:
// Refactor out REST_BASE to be environmentally set

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public $onApiListChanged: Subject<APIListChange> = new Subject<APIListChange>()

  constructor(private http: HttpClient) { }

  public getApi (apiId) {
    return this.http.get(`${environment.restBase}/apis/${apiId}`);
  }

  public addApi (api: API) {

    if(!api.id || ! api.id.length)
      delete api.id;

    if(api.swagger)
      api.swagger = JSON.stringify( api.swagger );

    let apiFormData:FormData = this.getFormDataFromObject(api);

    const request = this.http.post(`${environment.restBase}/apis`, apiFormData).pipe(tap( (addedApi : API) => {
      // Emit ApiListChanged event
      this.$onApiListChanged.next({
        action : CRUD.CREATE,
        api : addedApi
      });
    }));

    return request;
  }

  public updateApi (api: API) {
    if(api.swagger)
      api.swagger = JSON.stringify( api.swagger );

    let apiFormData:FormData = this.getFormDataFromObject(api);

    const request = this.http.put(`${environment.restBase}/apis/${api.id}`, apiFormData).pipe(tap( (addedApi : API) => {
      // Emit ApiListChanged event
      this.$onApiListChanged.next({
        action : CRUD.UPDATE,
        api : addedApi
      });
    }));

    return request;
  }

  public getApiList(){
    return this.http.get(`${environment.restBase}/apis`);
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