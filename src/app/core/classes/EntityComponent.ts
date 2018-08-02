import { FormGroup } from '@angular/forms';
import { USER_PERMISSIONS, ENTITY_PERMISSIONS } from './../enums/user-permissions.enum';
import { PermissibleEntity } from '../interfaces/permissible.interface';


export class EntityComponent {


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
}