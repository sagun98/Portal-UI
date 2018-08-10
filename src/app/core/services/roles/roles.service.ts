import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../../interfaces/fr-user.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient
  ) {}

  public getRoles () : Observable<UserRole[]> {
    return <Observable<UserRole[]>> this.http.get(`${environment.restBase}/roles`);
  }

  public getRole () {

  }

  public addRole() {

  }

  public removeRole() {

  }
}
