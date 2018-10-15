import { Observable } from 'rxjs/Observable';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(
    private http : HttpClient
  ) { }

  public followCategory(cid : number, entity: any, type : string) : Observable<boolean> {
    return <Observable<boolean>> this.http.post(`${environment.restBase}/forum/category/${cid}/follow?type=${type}`, entity);
  }

  public unfollowCategory(cid : number) : Observable<boolean> {
    return <Observable<boolean>> this.http.delete(`${environment.restBase}/forum/category/${cid}/follow`);
  }
}
