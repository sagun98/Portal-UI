import { PermissionsService } from '../../services/permissions/permissions.service';
import { PortalUser } from '../../interfaces/fr-user.interface';
import { Observable } from 'rxjs/Observable';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleCheckGuard implements CanActivate, CanActivateChild {

  constructor(
    private userService : UserService,
    private permissionsService : PermissionsService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkRoles(route, state)
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkRoles(childRoute, state)
  }

  private checkRoles(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const permissions: string[] = route.data.permissions;

    return new Observable(observer => {

      if(! permissions || ! permissions.length){
        observer.next(true);
        observer.complete();
      }

      else{
        this.userService.user.subscribe( (user : PortalUser) => {

          if(! user)
            return;

          if( this.userService.isAdmin() ){
            observer.next(true)
            observer.complete();
            return;
          }

          const matches = this.permissionsService.matchesAnyPermissions(permissions, user.roles);
          observer.next(matches);
          observer.complete();
          
          if(! matches)
            this.permissionsService.onForbiddenRouteAttempt.next(route);
        });
      }
    });
  }
}
