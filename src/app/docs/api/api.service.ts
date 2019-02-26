import { UserPrivilegeClass } from "../../core/classes/user-privilege";
import { environment } from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, of, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { CRUD } from "../../core/enums/crud.enum";
import { APIListChange } from "./interfaces/apiListChange.interface";
import { API } from "./interfaces/api.interface";
import { Privilege } from "../../core/interfaces/permissible.interface";
import { Product } from "../product/interfaces/product.interface";

interface CachedAPIs {
  api?: boolean;
  apis?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ApiService {
  public $onApiListChanged: Subject<APIListChange> = new Subject<APIListChange>();
  public _api_cache_: API;
  public _apis: API[] = [];
  public provideCachedVersion: CachedAPIs = {
    api: false,
    apis: false
  };

  constructor(private http: HttpClient) {}

  public getApi(apiId) : Observable<API> {
    // if(this.provideCachedVersion.api){
    //   this.provideCachedVersion.api = false;
    //   return of(this._api_cache_);
    // }

    return this.http.get(`${environment.restBase}/apis/${apiId}`).pipe(
      tap((api: API) => {
        this._api_cache_ = api;
      })
    );
  }

  public addApi(api: API) {
    if (!api.id || !api.id.length) delete api.id;

    let swagger = "";

    if (api.swagger) swagger = JSON.stringify(api.swagger);

    let apiFormData: FormData = new FormData();

    apiFormData.append("file", api.file);

    delete api.file;
    delete api.swagger;

    apiFormData.append("apiJSON", JSON.stringify(api));
    apiFormData.append("swagger", swagger);

    const request = this.http.post(`${environment.restBase}/apis`, apiFormData).pipe(
        tap((addedApi: API) => {
          this._api_cache_ = addedApi;

          // Emit ApiListChanged event
          this.$onApiListChanged.next({
            action: CRUD.CREATE,
            api: addedApi
          });
        })
      );

    return request;
  }

  public deleteApi(api: API) {
    return this.http.delete(`${environment.restBase}/apis/${api.id}`).pipe(
      tap(_api => {
        this.$onApiListChanged.next({
          action: CRUD.DELETE,
          api: api
        });
      })
    );
  }

  public updateApi(api: API) {
    let swagger = "";

    if (api.swagger) swagger = JSON.stringify(api.swagger);

    let apiFormData: FormData = new FormData();

    apiFormData.append("file", api.file);

    delete api.file;
    delete api.swagger;

    apiFormData.append("apiJSON", JSON.stringify(api));
    apiFormData.append("swagger", swagger);

    const request = this.http.put(`${environment.restBase}/apis/${api.id}`, apiFormData).pipe(
        tap((addedApi: API) => {
          this._api_cache_ = addedApi;

          // Emit ApiListChanged event
          this.$onApiListChanged.next({
            action: CRUD.UPDATE,
            api: addedApi
          });
        })
      );

    return request;
  }

  public createNewVersion(api: API) {
    let swagger = "";

    if (api.swagger) swagger = JSON.stringify(api.swagger);

    let apiFormData: FormData = new FormData();

    apiFormData.append("file", api.file);

    delete api.file;
    delete api.swagger;

    apiFormData.append("apiJSON", JSON.stringify(api));
    apiFormData.append("swagger", swagger);

    const request = this.http.post(`${environment.restBase}/apis/${api.id}`, apiFormData).pipe(
        tap((addedApi: API) => {
          this._api_cache_ = addedApi;

          // Emit ApiListChanged event
          this.$onApiListChanged.next({
            action: CRUD.UPDATE,
            api: addedApi
          });
        })
      );

    return request;
  }

  public getApiList() {
    return this.http.get(`${environment.restBase}/apis`).pipe(
      tap((apis : API[]) => {
        this._apis = apis;
      })
    );
  }

  public getPrivileges(id) {
    return this.http.get(`${environment.restBase}/apis/${id}/privileges`).pipe(
      map((privileges: Privilege[]) => {
        return privileges.map(p => {
          return new UserPrivilegeClass(p);
        });
      })
    );
  }

  public updateFineGrainedPrivileges(
    id: string,
    privileges: UserPrivilegeClass[]
  ): Observable<API> {
    return <Observable<API>>(
      this.http.put(`${environment.restBase}/apis/${id}/privileges`, privileges)
    );
  }

  public getApiByVersion (apiId: string, version: string) : Observable<API>  {
    return <Observable<API>> this.http.get(`${environment.restBase}/apis/${apiId}/version/${version}`)
  }

  public getProducts (api: API) : Observable<Product[]> {
    return <Observable<Product[]>> this.http.get(`${environment.restBase}/apis/${api.id}/products`);
  }

  public follow (id: string, cid: number) : Observable<API> {
    return <Observable<API>> this.http.post(`${environment.restBase}/apis/${id}/category/${cid}/follow`, null);
  }

  public unfollow (id: string, cid: number) : Observable<API> {
    return <Observable<API>> this.http.delete(`${environment.restBase}/apis/${id}/category/${cid}/follow`);
  }
}
