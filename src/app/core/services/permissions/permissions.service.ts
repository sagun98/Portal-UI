import { UserService } from '../user/user.service';
import { Privilege } from '../../interfaces/permissible.interface';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { UserRole, PortalUser } from '../../interfaces/fr-user.interface';
import { Injectable } from '@angular/core';
import { PermissibleEntity } from '../../interfaces/permissible.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  public onForbiddenRouteAttempt: Subject<ActivatedRouteSnapshot> = new Subject<ActivatedRouteSnapshot>();

  constructor(
    private userService: UserService
  ) { }

  public hasRole (permissionsToTest: string[], userRoles: UserRole[]) {
    let matches = false;

    if(userRoles && userRoles.length)
      for (let i = 0; i < userRoles.length; i++) {

        const roleName = userRoles[i].name;
        

        if ( permissionsToTest.indexOf(roleName) >= 0 ) {
          matches = true;
          break;
        }
      }

    return matches
  }

  public matchesAnyPermissions(permissionsToTest: string[], userRoles: UserRole[]) : boolean {
    let matches = false;

    if(userRoles && userRoles.length)
      for (let i = 0; i < userRoles.length; i++) {

        const permissionsList = userRoles[i].privileges.map(p => { return p.authority; });
        const intersection = permissionsToTest.filter(x => permissionsList.includes(x));

        if (intersection.length) {
          matches = true;
          break;
        }
      }

    return matches
  }

  public isEntityAdmin (entity: PermissibleEntity) : boolean {
    let isAdmin = false;
    const user: PortalUser = this.userService._lastUser.value;

    if(entity.userPrivileges)
      for(let i=0; i < entity.userPrivileges.length; i++){
        const privilege: Privilege = entity.userPrivileges[i];
        
        if (privilege.username === user.username && (privilege.permissions && privilege.permissions.indexOf("ADMIN") >= 0) ) {
          isAdmin = true;
          break;
        }
      }

    return isAdmin;
  }

  public hasPermission (entity: PermissibleEntity, permission: string) : boolean {
    let isAdmin = false;
    const user: PortalUser = this.userService._lastUser.value;

    if(entity.userPrivileges)
      for(let i=0; i < entity.userPrivileges.length; i++){
        const privilege: Privilege = entity.userPrivileges[i];
        
        if (privilege.username === user.username && (privilege.permissions && privilege.permissions.indexOf(permission) >= 0) ) {
          isAdmin = true;
          break;
        }
      }

    return isAdmin;
  }

  public hasOnlyPermission (entity: PermissibleEntity, permission: string) : boolean {
    let isAdmin = false;
    const user: PortalUser = this.userService._lastUser.value;

    if(entity.userPrivileges)
      for(let i=0; i < entity.userPrivileges.length; i++){
        const privilege: Privilege = entity.userPrivileges[i];
        
        if (privilege.username === user.username && (privilege.permissions && privilege.permissions.length == 1 && privilege.permissions.indexOf(permission) >= 0) ) {
          isAdmin = true;
          break;
        }
      }


    return isAdmin;
  }
}
