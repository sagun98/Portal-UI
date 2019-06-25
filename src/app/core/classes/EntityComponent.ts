import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { USER_PERMISSIONS, ENTITY_PERMISSIONS } from '../enums/user-permissions.enum';
import { PermissibleEntity } from '../interfaces/permissible.interface';
import { of } from 'rxjs';
import { UserPrivilegeClass } from './user-privilege';
import { PermissionsService } from '../services/permissions/permissions.service';
import { VerifyFormSavedComponent } from './verify-form-saved';
import { ERROR_CLASSES } from '../constants/error-classes.constant';

export abstract class EntityComponent extends VerifyFormSavedComponent{
  public managePrivilegesModalOpened: boolean = false;
  public userPrivileges: UserPrivilegeClass[] = [];
  public errorClasses = ERROR_CLASSES;
  
  protected abstract getPermissionService() : PermissionsService;

  public getEntityPrivileges() : Observable<Object>{ return of({}); }

  public get permissions(): any {
    return USER_PERMISSIONS
  }

  public get entityPermissions() {
    return ENTITY_PERMISSIONS;
  }

  public disableFormBasedOnPrivileges (form: FormGroup, entity : PermissibleEntity) {
    if(entity.productUserPrivileges && entity.productUserPrivileges.length)
      entity.userPrivileges = entity.userPrivileges.concat(entity.productUserPrivileges);
      
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

  protected setSlugValue (name?: string) {
    name = name || this.form.get('name').value;
    let slug = name.replace(/[^A-Za-z0-9\s]/gi, '').replace(/\s+/gi, "_").toLowerCase();
    const lastCharacter = slug.substring(slug.length - 1, slug.length);

    if(lastCharacter === '_')
      slug = slug.substring(0, slug.length - 1);

    this.form.get('slug').setValue(slug);
  }
}