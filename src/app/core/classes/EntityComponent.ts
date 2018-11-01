import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { USER_PERMISSIONS, ENTITY_PERMISSIONS } from '../enums/user-permissions.enum';
import { PermissibleEntity } from '../interfaces/permissible.interface';
import { of } from 'rxjs';
import { UserPrivilegeClass } from './user-privilege';
import { PermissionsService } from '../services/permissions/permissions.service';

export abstract class EntityComponent {
  public managePrivilegesModalOpened: boolean = false;
  public userPrivileges: UserPrivilegeClass[] = [];
  
  protected abstract getPermissionService() : PermissionsService;

  public getEntityPrivileges() : Observable<Object>{ return of({}); }

  public get permissions(): any {
    return USER_PERMISSIONS
  }

  public get entityPermissions() {
    return ENTITY_PERMISSIONS;
  }

  public disableFormBasedOnPrivileges (form: FormGroup, entity : PermissibleEntity) {
    if ( this.noPermission(entity) || this.getPermissionService().hasOnlyPermission(entity, "COLLABORATOR") ) {
      form.disable();

      form.valueChanges.subscribe(v => {
        if(v.apiManagementTool)
          form.get('apiManagementTool').disable({emitEvent : false, onlySelf : true});
      });
    }
  }

  public openManageApiPrivilegesModal() {
    this.managePrivilegesModalOpened = false;
    
    this.getEntityPrivileges().subscribe( (privileges : UserPrivilegeClass[]) => {
      this.userPrivileges = privileges;
      
      setTimeout(t => { this.managePrivilegesModalOpened = true; });
    });
  }

  private noPermission (entity) : boolean {
    return <boolean> (entity.id && (! entity.userPrivileges || ! entity.userPrivileges.length));
  }
}