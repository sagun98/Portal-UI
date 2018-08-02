import { UserService } from './../services/user/user.service';
import { ENTITY_PERMISSIONS } from './../enums/user-permissions.enum';
import { PermissibleEntity, Privilege } from './../interfaces/permissible.interface';
import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[hasPermissionTo]'
})
export class HasPermissionToDirective implements OnChanges {
  
  @Input() hasPermissionTo: string;
  @Input() entity: PermissibleEntity;

  private initialDisplay: string;

  constructor(
    private element: ElementRef,
    private userService: UserService
  ) {
    this.initialDisplay = this.element.nativeElement.style.display;
  }

  public ngOnChanges () {
    const userPrivileges = (this.entity.userPrivileges) ? this.entity.userPrivileges[0] : <Privilege> {username : '', permissions : []};

   if( this.userService.isAdmin() )
    return;

    this.element.nativeElement.style.display = (userPrivileges.permissions.indexOf(this.hasPermissionTo) >= 0) ? this.initialDisplay : 'none';  
  }
}
