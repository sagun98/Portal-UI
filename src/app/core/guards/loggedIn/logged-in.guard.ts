import { Observable } from 'rxjs/Observable';
import { FailedNavigation, FAILED_NAVIGATION_TYPE } from '../../services/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild {

  constructor(
    private userService : UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.confirmIsLoggedIn(route, state);
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.confirmIsLoggedIn(childRoute, state);
  }

  private confirmIsLoggedIn (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    return  new Observable(observer => {
      this.userService.$loggedIn.subscribe(loggedIn => {
        if(loggedIn !== null){
          this.handle(loggedIn, observer, state);
        }

        else {
          this.userService.$loggedIn.subscribe(loggedIn => {
            this.handle(loggedIn, observer, state);
          });
        }
      });
    });
  }

  private handle (loggedIn: boolean, observer:Subscriber<boolean>, state: RouterStateSnapshot) {
    if( loggedIn == null)
      return;

    if( loggedIn ){
      this.userService.user.subscribe(
        user => {
          observer.next(loggedIn);
          observer.complete();
        },

        errorResponse => {
          observer.next( false );
          observer.complete();
          this.userService.staticLogout();
        }
      );

    }
    else{
      observer.next( loggedIn );
      observer.complete();
      // this.userService.$onUnAuthenticatedNavigationAttempt.next(<FailedNavigation> {
      //   type : FAILED_NAVIGATION_TYPE.NAVIGATION,
      //   attemptedUrl : state.url
      // });
    }
  }
}