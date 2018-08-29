import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NodeBBUser } from './nodebb-user.interface';
import { Injectable } from '@angular/core';
import { NodebbModule } from '../nodebb.module';

@Injectable({
  providedIn: NodebbModule
})
export class NodeBBUserService {

  private apiBase: string = 'api/v2/users';

  constructor(
    private http: HttpClient
  ) { }

  public createUser (user : NodeBBUser, ) {
    const params = new HttpParams()
                    .append('_uid', '1');
    
    let headers = new HttpHeaders()
                    .append("Authorization", `Bearer 65af6abb-039f-4b6b-80a8-80490f2a3887`);

    console.log("params: ", params);
    console.log("headers: ", headers);

    return this.http.post(`${environment.forumBase}/${this.apiBase}`, user, { headers, params });
  }
}
