import { Observable, of } from 'rxjs';
import { NodeBBPrivilegeRequest } from './nodebb-privilege-request.interface';
import { NodebbModule } from '../nodebb.module';
import { NodeBBCategory } from './nodebb-category.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WriteApiHelper } from '../class/write-api-helper.class';
import { NodeBBCategoryResponse } from './nodebb-category-response.interface';
import { environment } from '../../../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NodeBBCategoryService extends WriteApiHelper {

  protected apiBase: string = 'api/v2/categories';

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public getChildCategoryId (parentCid: number, childName: string) : Observable<number> {
    return <Observable<number>> this.http.get(`${environment.forumBase}/api/category/${parentCid}`).pipe(
      catchError( error => {
        return of(parentCid);
      }),
      map( (category: NodeBBCategory) => {
        let announcementCategory : NodeBBCategory = category.children.filter(category => {
          return ( category.name.toLocaleLowerCase() === childName.toLocaleLowerCase() );
        })[0];

        return (announcementCategory) ? announcementCategory.cid : null;
      })
    );
  }

  public createCategory (category: NodeBBCategory, uid: number) : Observable<NodeBBCategoryResponse> {
    const params = new HttpParams().append('_uid', uid.toString());
    return <Observable<NodeBBCategoryResponse>> this.http.post(this.writeApiBase, category, { params, headers : this.authorizationHeader});
  }

  public setModerator (categoryId: number, privilegeRequest: NodeBBPrivilegeRequest) {
    return this.http.put(`${this.writeApiBase}/${categoryId}/privileges`, privilegeRequest, { headers : this.authorizationHeader })
  }
}
