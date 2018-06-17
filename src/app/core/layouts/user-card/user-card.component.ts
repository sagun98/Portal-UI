import { Component, OnInit, Input } from '@angular/core';
import { PortalUser } from '../../classes/fr-user.class';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: PortalUser;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
  }

  public logout () {

    const doLogout = confirm('Do you really want to logout?');

    if(doLogout){
      this.userService.logout().subscribe( response =>  {

      });
    }
  }

}
