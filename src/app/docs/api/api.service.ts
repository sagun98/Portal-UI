import { UserPrivilegeClass } from './../../core/classes/user-privilege';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { isNull, isArray } from 'util';
import { CRUD } from '../../core/enums/crud.enum';
import { APIListChange } from './interfaces/apiListChange.interface';
import { API } from './interfaces/api.interface';
import { Privilege } from '../../core/interfaces/permissible.interface';

interface CachedAPIs {
  api?: boolean,
  apis?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public $onApiListChanged: Subject<APIListChange> = new Subject<APIListChange>()
  public _api_cache_ : API;
  public _apis_cache_ : API[] = [];
  public provideCachedVersion:CachedAPIs = {
    api : false,
    apis : false
  }

  constructor(private http: HttpClient) { }

  public getApi (apiId) {
    if(this.provideCachedVersion.api){
      this.provideCachedVersion.api = false;
      return of(this._api_cache_);
    }

    return this.http.get(`${environment.restBase}/apis/${apiId}`).pipe(
      tap ( (api : API) => {
        this._api_cache_ = api;
      })
    );
  }

  public addApi (api: API) {

    if(!api.id || ! api.id.length)
      delete api.id;

    if(api.swagger)
      api.swagger = JSON.stringify( api.swagger );

    let apiFormData:FormData = this.getFormDataFromObject(api);

    const request = this.http.post(`${environment.restBase}/apis`, apiFormData).pipe(tap( (addedApi : API) => {
      this._api_cache_ = addedApi;

      // Emit ApiListChanged event
      this.$onApiListChanged.next({
        action : CRUD.CREATE,
        api : addedApi
      });
    }));

    return request;
  }

  public deleteApi (api : API) {
    return this.http.delete(`${environment.restBase}/apis/${api.id}`).pipe(
      tap(_api => {
        this.$onApiListChanged.next({
          action : CRUD.DELETE,
          api : api
        })
      })
    );
  }

  public updateApi (api: API) {
    if(api.swagger)
      api.swagger = JSON.stringify( api.swagger );

    let apiFormData:FormData = this.getFormDataFromObject(api);

    const request = this.http.put(`${environment.restBase}/apis/${api.id}`, apiFormData).pipe(tap( (addedApi : API) => {
      this._api_cache_ = addedApi;

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

  public getPrivileges (id) {
    return this.http.get(`${environment.restBase}/apis/${id}/privileges`).pipe(
      map( (privileges : Privilege[]) => {
        return privileges.map(p => { return  new UserPrivilegeClass(p); })
      })
    )
  }

  public updateFineGrainedPrivileges (id: string, privileges : UserPrivilegeClass[]) {
    return this.http.put(`${environment.restBase}/apis/${id}/privileges`, privileges);
  }

  // Convert object to form data
  private getFormDataFromObject (obj: any) : FormData {
    let formData:FormData = new FormData();

    Object.keys( obj ).forEach(key => {
      const htmlKeyTest = new RegExp('(reference|overview|gettingStarted)');
      let value = obj[key];
      
      if( isNull( value ) )
        value = '';

      if(htmlKeyTest.test(key) && value === '')
        value = '<p>&nbsp;</p>';

      if(isArray(value))
        value = JSON.stringify(value);

      formData.append(key, value);
    });

    return formData;
  }
}