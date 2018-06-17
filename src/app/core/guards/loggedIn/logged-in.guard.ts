import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild {

  constructor(
    private userService : UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.confirmIsLoggedIn();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.confirmIsLoggedIn();
  }

  private confirmIsLoggedIn () : Observable<boolean> {
    return  new Observable(observer => {
      this.userService.$loggedIn.subscribe(loggedIn => {
        observer.next(loggedIn);
        observer.complete();

        if(! loggedIn)
          this.userService.$onUnAuthenticatedNavigationAttempt.next(true);
      });
    });
  }
  
}
