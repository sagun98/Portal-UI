import { IPortalUser } from '../../interfaces/fr-user.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, share } from 'rxjs/operators';
import { PortalUser } from '../../interfaces/fr-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public $retrievedUser: BehaviorSubject<PortalUser> = new BehaviorSubject<PortalUser>(null);
  public $doUserLogin: Subject<boolean> = new Subject<boolean>();
  public $onUnAuthenticatedNavigationAttempt: BehaviorSubject<FailedNavigation> = new BehaviorSubject<any>(null);
  public attemptedUrl: string = '';
  
  private userRequest: Observable<{} | PortalUser>;

  // Class member to hold the portal user
  protected _user: PortalUser;

  // Subject that will allow subscribers to be aware of user changes
  public _lastUser: BehaviorSubject<PortalUser> = new BehaviorSubject<PortalUser>(null);

  constructor(
    private http: HttpClient
  ) { }

  public get authToken() {
    return localStorage.getItem('pearson.devportal.authToken') || '';
  }

  // make sure the request for the user is only made once
  public get user() {
    if (this._user != null) {
      this._lastUser = new BehaviorSubject<PortalUser>(this._user);
      return this._lastUser;
    }
    else if (this.userRequest) {
      return this.userRequest;
    }
    else {
      this.userRequest =  this.getUser();
      return this.userRequest;
    }
  }

  public get staticUser () {
    return this._user;
  }

  public isAdmin () : boolean {
    if(! this._user || ! this._user.roles)
      return false;

    return this._user.roles.filter(role => {return role.name === "ADMIN"}).length > 0;
  }

  public set authToken(authToken: string) {
    localStorage.setItem('pearson.devportal.authToken', authToken);
  }

  public setLoggedInState() {
    const authToken = this.authToken;

    if (authToken.length) {
      this.$loggedIn.next(true);
    }
  }

  public authenticate(credentials: FRCredentials) {
    credentials = credentials || <FRCredentials>{password : '', username : ''};

    let headers = new HttpHeaders()
      .append('X-OpenAM-Username', credentials.username)
      .append('X-OpenAM-Password', credentials.password);

    return this.http.post(`${environment.restBase}/auth/authenticate`, {}, { headers }).pipe(tap((authResponse: any) => {
      this.authToken = authResponse.token;
    }));
  }

  public getUser() {
    let headers = new HttpHeaders()
      .append('PearsonSSOSession', this.authToken);

    return this.http.get<any>(`${environment.restBase}/user`, { headers: headers, withCredentials: true}).pipe(
      map((user: IPortalUser) => {
        return this.tapUser(user);
      }),
      share()
    );
  }

  public getUserById (userId) {
    return this.http.get<any>(`${environment.restBase}/users/${userId}`).pipe(
      map((user : IPortalUser) => {
        return (user) ?  new PortalUser(user) : null;
      })
    );
  }

  public updateRoles (user : PortalUser) {
    return this.http.put(`${environment.restBase}/users/${user.id}/roles`, user.roles);
  }

  public logout() {
    let headers = new HttpHeaders()
      .append('PearsonSSOSession', this.authToken)
      .append('Content-Type', 'application/json');

    return this.http.post(`${environment.restBase}/auth/logout`, null, { headers: headers }).pipe(
      tap((user: IPortalUser) => {
        this.staticLogout();
      })
    );
  }

  public isFollowingEntity (followers: string[]) : boolean {
    if(! followers)
      return false;
      
    return (followers.indexOf(this._user.username) >= 0);
  }

  public staticLogout () {
    this.userRequest = null;
    this.authToken = '';
    this.$loggedIn.next(false);
    this.$retrievedUser.next(null);
    this._user = null;
    this._lastUser.next(this._user);
    this.$onUnAuthenticatedNavigationAttempt.next(<FailedNavigation> {
      type : FAILED_NAVIGATION_TYPE.LOGOUT,
      attemptedUrl : window.location.hash.replace('#', '')
    });
  }

  private tapUser (user: IPortalUser) : PortalUser {
    this._user = new PortalUser(user);
    this.$loggedIn.next(true);
    this.$retrievedUser.next(this._user);
    if(this._lastUser)
      this._lastUser.next( this._user );
    return this._user;
  }
}

export interface FRCredentials {
  username?: string,
  password?: string
}

export enum FAILED_NAVIGATION_TYPE {
  LOGOUT = 'logout',
  NAVIGATION = 'navigation'
}

export interface FailedNavigation {
  type : FAILED_NAVIGATION_TYPE,
  attemptedUrl : string
}