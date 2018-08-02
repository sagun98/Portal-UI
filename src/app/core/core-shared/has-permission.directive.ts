import { PortalUser } from '../interfaces/fr-user.interface';
import { UserService } from '../services/user/user.service';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PermissionsService } from '../services/permissions/permissions.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {

  @Input() hasPermission: any[] = [];
  @Input() initialDisplay: string;

  constructor(
    private element: ElementRef,
    private permissionService : PermissionsService,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.initialDisplay = this.initialDisplay || this.element.nativeElement.style.display;
    
    this.element.nativeElement.style.display = 'none';

    this.userService.user.subscribe((user: PortalUser) => {
      
      const matches = this.permissionService.matchesAnyPermissions(this.hasPermission, user.roles);

      if( this.userService.isAdmin() ){
        this.element.nativeElement.style.display = this.initialDisplay;
        return;
      }

      if (!matches)
        this.element.nativeElement.style.display = 'none';

      else
        this.element.nativeElement.style.display = this.initialDisplay;

    });
  }
}
