import { PortalUser, UserRole } from '../../interfaces/fr-user.interface';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { RolesService } from '../../services/roles/roles.service';

@Component({
  selector: 'user-settings-modal',
  templateUrl: './user-settings-modal.component.html',
  styleUrls: ['./user-settings-modal.component.scss']
})
export class UserSettingsModalComponent implements OnChanges {

  @Input() opened : boolean = false;
  @Input() user: PortalUser;

  public roles: UserRole[] = [];
  public activeTabs = {
    manageRoles : false,
    myRoles : false
  };

  constructor(
    private roleService : RolesService
  ) {
    
  }

  ngOnChanges (changes: SimpleChanges) {
    if(changes.opened && changes.opened.currentValue === true){
      this.roleService.getRoles().subscribe( (roles: UserRole[]) => {
        this.roles = roles;
      });
    }

    else if(changes.opened && changes.opened.currentValue === false){
      
    }
  }
}
