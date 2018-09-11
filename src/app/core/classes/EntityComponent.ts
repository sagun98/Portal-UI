import { Observable } from 'rxjs/Observable';
import { PortalUser } from '../interfaces/fr-user.interface';
import { FormGroup } from '@angular/forms';
import { USER_PERMISSIONS, ENTITY_PERMISSIONS } from '../enums/user-permissions.enum';
import { PermissibleEntity, Privilege } from '../interfaces/permissible.interface';
import { of } from 'rxjs';
import { UserPrivilegeClass } from './user-privilege';

export class EntityComponent {
  public managePrivilegesModalOpened: boolean = false;
  public userPrivileges: UserPrivilegeClass[] = [];

  public getEntityPrivileges() : Observable<Object>{ return of({}); }

  public get permissions(): any {
    return USER_PERMISSIONS
  }

  public get entityPermissions() {
    return ENTITY_PERMISSIONS;
  }

  public disableFormBasedOnPrivileges (form: FormGroup, entity : PermissibleEntity) {
    if ( entity.id && (! entity.userPrivileges || ! entity.userPrivileges.length))
      form.disable();
  }

  public openManageApiPrivilegesModal() {
    this.managePrivilegesModalOpened = false;
    
    this.getEntityPrivileges().subscribe( (privileges : UserPrivilegeClass[]) => {
      this.userPrivileges = privileges;
      
      setTimeout(t => { this.managePrivilegesModalOpened = true; });
    });
  } 
}