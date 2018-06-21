import { PortalUser } from './../../classes/fr-user.class';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, share, catchError } from 'rxjs/operators';
import { FRUser } from '../../interfaces/fr-user.interface';

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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public $retrievedUser: BehaviorSubject<PortalUser> = new BehaviorSubject<PortalUser>(null);
  public $doUserLogin: Subject<boolean> = new Subject<boolean>();
  public $onUnAuthenticatedNavigationAttempt: BehaviorSubject<FailedNavigation> = new BehaviorSubject<any>(null);
  public attemptedUrl: string = '';
  
  private username: string;
  private _user: PortalUser;
  private userRequest: Observable<PortalUser>;

  constructor(
    private http: HttpClient
  ) { }

  private get authToken() {
    return localStorage.getItem('pearson.devportal.authToken') || '';
  }

  private get userId() {
    return localStorage.getItem('pearson.devportal.userId') || '';
  }

  public get user() {
    if (this._user != null) {
      return new BehaviorSubject<PortalUser>(this._user);
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

  private set authToken(authToken: string) {
    localStorage.setItem('pearson.devportal.authToken', authToken);
    localStorage.setItem('pearson.devportal.userId', this.username);
  }

  public setLoggedInState() {
    const authToken = this.authToken;

    if (authToken.length) {
      this.$loggedIn.next(true);
    }
  }

  public authenticate(credentials: FRCredentials) {
    let headers = new HttpHeaders()
      .append('X-OpenAM-Username', credentials.username)
      .append('X-OpenAM-Password', credentials.password);

    return this.http.post(`https://identity-internal.pearson.com/auth/json/pearson/authenticate`, {}, { headers }).pipe(tap((authResponse: any) => {
      this.username = credentials.username;
      this.authToken = authResponse.tokenId;
    }));
  }

  public getUser() {
    let headers = new HttpHeaders()
      .append('PearsonSSOSession', this.authToken);

    return this.http.get<PortalUser>(`https://identity-internal.pearson.com/auth/json/pearson/users/${this.userId}`, { headers: headers }).pipe(
      map((user: FRUser) => {
        return this.tapUser(user);
      }),
      catchError( (err: any, caught: Observable<PortalUser> ) => {
        this.username = '';
        this.authToken = '';
        this.$loggedIn.next(false);
        return caught;
      }),
      share()
    );
  }

  public logout() {
    let headers = new HttpHeaders()
      .append('PearsonSSOSession', this.authToken);

    return this.http.post(`https://identity-internal.pearson.com/auth/json/pearson/sessions/?_action=logout`, null, { headers: headers }).pipe(
      tap((user: FRUser) => {
        this.username = '';
        this.authToken = '';
        this.$loggedIn.next(false);
        this.$retrievedUser.next(null);
        this.$onUnAuthenticatedNavigationAttempt.next(<FailedNavigation> {
          type : FAILED_NAVIGATION_TYPE.LOGOUT,
          attemptedUrl : window.location.hash.replace('#', '')
        });
      })
    );
  }

  private tapUser (user: FRUser) : PortalUser {
    this._user = new PortalUser(user);
    this.$loggedIn.next(true);
    this.$retrievedUser.next(this._user);
    return this._user;
  }
}