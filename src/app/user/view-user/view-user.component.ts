import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IPortalUser } from 'src/app/core/interfaces/fr-user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  users: IPortalUser[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe(users => {
        this.users = users;
      }, error => {
        console.log('Error retrieving users');
      });
  }

  onDeleteUser(userId: String) {
    const doDelete = confirm('Are you sure you want to delete this user?');

    if (doDelete) {
      const self = this;
      this.userService.removeUser(userId).subscribe(() => {
        this.userService.getAllUsers()
          .subscribe(users => {
            this.users = users;
          });
      });
    }
  }

  onAddUser() {
    this.userService.userStateChange.next('manage');
  }
}
