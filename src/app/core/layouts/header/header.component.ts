import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subject } from 'rxjs';
import { PortalUser } from '../../interfaces/fr-user.interface';

@Component({
  selector: 'dev-portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Pearson Developer Title';
  public loggedIn: boolean = false;
  public user: PortalUser;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.$retrievedUser.subscribe( (user:PortalUser) => {
      this.user = user;
      this.loggedIn = (user) ? true : false; 
    });
  }

  public showLoginModal() {
    this.userService.$doUserLogin.next( false );
    setTimeout(t => {this.userService.$doUserLogin.next( true  );})
  }

}