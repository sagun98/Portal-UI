import { PermissionsService } from '../services/permissions/permissions.service';
import { UserService } from '../services/user/user.service';
import { ENTITY_PERMISSIONS } from '../enums/user-permissions.enum';
import { PermissibleEntity, Privilege } from '../interfaces/permissible.interface';
import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';
import { isArray } from 'util';

@Directive({
  selector: '[hasPermissionTo]'
})
export class HasPermissionToDirective implements OnChanges {
  
  @Input() hasPermissionTo: string[];
  @Input() entity: PermissibleEntity;

  private initialDisplay: string;

  constructor(
    private element: ElementRef,
    private userService: UserService,
    private permissionsService: PermissionsService
  ) {
    this.initialDisplay = this.element.nativeElement.style.display;
  }

  public ngOnChanges () {
    // this is a new entity with not FGRs
    // Let coarse grain win
    if((! this.entity.userPrivileges && ! this.entity.version) || (this.entity.userPrivileges && ! this.entity.userPrivileges.length ))
      return;

    const userPrivileges = (this.entity.userPrivileges && this.entity.userPrivileges.length) ? this.entity.userPrivileges[0] : <Privilege> {username : this.userService._lastUser.value.username, permissions : ['NONE']};
    userPrivileges.permissions = userPrivileges.permissions || ['NONE'];

    if( this.userService.isAdmin() || this.permissionsService.hasPermission(this.entity, "ADMIN")/* || ! userPrivileges || (userPrivileges && ! userPrivileges.permissions) || (userPrivileges && userPrivileges.permissions && ! userPrivileges.permissions.length) */)
      return;

    const intersection = userPrivileges.permissions.filter(x => this.hasPermissionTo.includes(x));

    this.element.nativeElement.style.display = (intersection.length) ? (this.element.nativeElement.dataset.display) ? this.element.nativeElement.dataset.display : this.initialDisplay : 'none';
  }
}
