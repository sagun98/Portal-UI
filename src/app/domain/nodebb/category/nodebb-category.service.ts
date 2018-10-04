import { Observable } from 'rxjs';
import { NodeBBPrivilegeRequest } from './nodebb-privilege-request.interface';
import { NodebbModule } from '../nodebb.module';
import { NodeBBCategory } from './nodebb-category.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WriteApiHelper } from '../class/write-api-helper.class';
import { NodeBBCategoryResponse } from './nodebb-category-response.interface';

@Injectable({
  providedIn: NodebbModule
})
export class NodeBBCategoryService extends WriteApiHelper {

  protected apiBase: string = 'api/v2/categories';

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public createCategory (category: NodeBBCategory, uid: number) : Observable<NodeBBCategoryResponse> {
    const params = new HttpParams().append('_uid', uid.toString());
    return <Observable<NodeBBCategoryResponse>> this.http.post(this.writeApiBase, category, { params, headers : this.authorizationHeader});
  }

  public setModerator (categoryId: number, privilegeRequest: NodeBBPrivilegeRequest) {
    return this.http.put(`${this.writeApiBase}/${categoryId}/privileges`, privilegeRequest, { headers : this.authorizationHeader })
  }
}
