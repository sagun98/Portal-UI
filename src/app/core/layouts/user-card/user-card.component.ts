import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { PortalUser } from '../../interfaces/fr-user.interface';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: PortalUser;
  @Output() userSettingsClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private userService : UserService,
    private angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag
  ) { }

  ngOnInit() {
  }

  public logout () {

    const doLogout = confirm('Do you really want to logout?');

    if(doLogout){
      this.userService.logout().subscribe( response =>  {
        this.angulartics2GoogleGlobalSiteTag.eventTrack('userLogout', {
          category : 'userAction',
          label : 'userLogout',
          value : this.user
        });
      });
    }
  }


  public openUserSettings () {
    this.userSettingsClick.emit(true);
  }
}
