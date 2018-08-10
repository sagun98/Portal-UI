import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserRole, PortalUser } from '../../../interfaces/fr-user.interface';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

interface RoleHeader {
  role : UserRole,
  addAll: boolean
}

@Component({
  selector: 'role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit, OnChanges {

  @Input() roles: UserRole[] = []

  public form : FormGroup;
  public username: string;
  public users: PortalUser[] = [];
  public modified: boolean = false;
  public headers: RoleHeader[] = [];
  public my: PortalUser;

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    //this.buildForm();

    this.userService.user.subscribe( (user: PortalUser) => {
      this.my = user;
    });
  }

  ngOnChanges () {
    this.constructHeaders();
  }

  private constructHeaders() {
    this.headers = this.roles.map(role => {
      return <RoleHeader> {
        role : role,
        addAll : false
      };
    })
  }

  public handleFailedFormValidation(failed : boolean) {
    this.toastrService.warning('User already exits in the table');
  }

  public handleNoResults (username) {
    this.toastrService.error('User: ' + username + ' does not exist');
  }

  public handleResults (user : PortalUser) {
    user.setRoelMap(this.roles);
    this.users.push(user);
  }

  public handleSave () {
    const requests = this.users.map(user => {
      return this.userService.updateRoles(user);
    });

    forkJoin(requests).subscribe(results => {
      this.userService.getUser().subscribe(user => {return;});
      this.toastrService.success('User roles successfully updated');
      this.modified = false;
    });
  }

  public removeUser (user : PortalUser) {
    this.users.forEach( (_user: PortalUser, index : number) =>  {
      if(_user.id === user.id)
        this.users.splice(index, 1);
    });
  }

  public changeAllRoles (user: PortalUser, add: boolean) {
    this.roles.forEach(role => {
      // if(this.my.id === user.id && role.name === 'ADMIN')
      //   return;
      
      //else{
        user.roleMap[role.name] = add;
        this.handleRoleChange(user, role.name);
      //}
    });
  }

  public addRemoveRoleToAllUsers (role: string, add : boolean) {
    this.users.forEach(user => {
      user.roleMap[role] = add;
      this.handleRoleChange(user, role);
    });
  }

  public handleRoleChange (user : PortalUser, role: string) {

    if(user.roleMap[role])
      user.addRole( this.roles.filter(_role => {return _role.name === role})[0] );
    else{
      const doDelete = (this.my.id === user.id && role === 'ADMIN') ? confirm("Are you sure you want to remove the ADMIN role?  Once this change is saved, You will no longer be able to perform ADMIN functions.") : true;
      
      if(doDelete)
        user.removeRole( role );
      else
        setTimeout(t => {user.roleMap.ADMIN = true;});
    }
      

    this.modified = true;
  }

  public isUserValid =  (username : string) => {
    const matchCount = this.users.filter( (user : PortalUser) =>  { return user.username.toLocaleLowerCase() === username.toLocaleLowerCase() }).length;
    return (matchCount === 0) ? true : false;
  }
}
