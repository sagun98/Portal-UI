import { FRUser } from './../../interfaces/fr-user.interface';
import { PortalUser } from './../../classes/fr-user.class';
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
      const loggedIn = this.userService.$loggedIn.getValue()

      if( loggedIn ){
        this.userService.user.subscribe( (user : PortalUser) =>  {
          observer.next( loggedIn );
          observer.complete();
        })
      }
      else{
        observer.next( loggedIn );
        observer.complete();
      }
    });
  }
}
