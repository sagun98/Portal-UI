import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PermissibleEntity, Privilege } from '../../../../core/interfaces/permissible.interface';
import { UserPrivilegeClass } from '../../../../core/classes/user-privilege';
import { PortalUser } from '../../../../core/interfaces/fr-user.interface';

@Component({
  selector: 'entity-permissions-modal',
  templateUrl: './entity-permissions-modal.component.html',
  styleUrls: ['./entity-permissions-modal.component.scss']
})
export class EntityPermissionsModalComponent implements OnInit {

  @Input() opened : boolean = false;
  @Input() entity : PermissibleEntity;
  @Input() userPrivileges : UserPrivilegeClass[] = [];
  @Input() validateNewUser;
  @Input() canCollaborate: boolean = false;
  @Output() onSave: EventEmitter<UserPrivilegeClass[]> = new EventEmitter<UserPrivilegeClass[]>();

  public modified: boolean = false;

  constructor(
    private toastrService : ToastrService
  ) { }

  ngOnInit() {
    if (this.entity.published)
      this.canCollaborate = false;
  }

  public handleFailedFormValidation(failed : boolean) {
    this.toastrService.warning('User already exits in the table');
  }

  public handleNoResults (username) {
    this.toastrService.error('User: ' + username + ' does not exist');
  }

  public handlePrivilegeChange (privilegeName : string, userPrivilege : UserPrivilegeClass) {
    this.modified = true;
    userPrivilege.updatePermissions(privilegeName);
  }

  public onPermissionSelect (userPrivilege: UserPrivilegeClass) {
    this.modified = true;
    userPrivilege.permissions = [userPrivilege.uniquePrivilege];
  }

  public handleSave () {
    this.modified = false;
    this.onSave.emit(this.userPrivileges);
  }

  public handleResults (user : PortalUser) {

    if(! this.validateNewUser)
      throw "Validation method required for new user";

    if(this.existsInTable(user)){
      this.toastrService.warning('This user already exists in the table');
      return;
    }

    if(this.validateNewUser(user)) {

      let permissions = (this.canCollaborate) ? ["COLLABORATOR"] : ["MODIFY"];

      if(this.userPrivileges.length === 0)
        permissions.push("ADMIN");

      this.userPrivileges.push(new UserPrivilegeClass(<Privilege> {
        username : user.username,
        email : user.email,
        permissions : permissions
      }));

      this.modified = true;
    }
    else if(! this.validateNewUser(user) && this.canCollaborate){
      let permissions = ["COLLABORATOR"];

      this.userPrivileges.push(new UserPrivilegeClass(<Privilege> {
        collaborateOnly : true,
        username : user.username,
        permissions : permissions,
        email : user.email
      }));

      this.modified = true;
    }
    else
      this.toastrService.error('Cannot add this user: ' + user.username, 'Incorrect User Role');
  }

  public removeUserPrivileges (userPrivilege: UserPrivilegeClass) {

    var doDelete = confirm('Are you sure you want to delete this users Privileges?');

    this.modified = true;

    if(doDelete)
      this.userPrivileges = this.userPrivileges.filter(up => {
        return up.username !== userPrivilege.username;
      });
  }

  public addPrivilegeToUsers (privilege, added) {
    this.userPrivileges.forEach(up => {
      up.privilegeMap[privilege] = added;
      up.updatePermissions(privilege);
    })
  } 

  private existsInTable (user : PortalUser) {
    return (this.userPrivileges.filter(p => { return p.username === user.username; }).length) ? true : false;
  }
}
