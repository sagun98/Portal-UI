import { ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { UserRole } from './../../interfaces/fr-user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  public onForbiddenRouteAttempt: Subject<ActivatedRouteSnapshot> = new Subject<ActivatedRouteSnapshot>();

  constructor() { }

  public matchesAnyPermissions(permissionsToTest: string[], userRoles: UserRole[]) : boolean {
    let matches = false;

    if (! userRoles || ! userRoles.length)
      matches = false;

    else
      for (let i = 0; i < userRoles.length; i++) {

        const permissionsList = userRoles[i].privileges.map(p => { return p.authority; });
        const intersection = permissionsToTest.filter(x => permissionsList.includes(x));

        if (intersection.length) {
          matches = true;
          break;
        }
        // console.log(this.hasPermission);
        // console.log(permissionsList)
        // console.log(intersection);
      }

    return matches
  }
}
