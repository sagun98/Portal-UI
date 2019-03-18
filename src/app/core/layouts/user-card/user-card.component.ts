import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { PortalUser } from '../../interfaces/fr-user.interface';
import { Angulartics2GoogleGlobalSiteTagOverride } from '../../../shared/angulartics-2-google-global-site-tag-override.service';

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
    private angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTagOverride
  ) { }

  ngOnInit() {
  }

  public logout () {

    const doLogout = confirm('Do you really want to logout?');

    if(doLogout){
      this.userService.logout().subscribe( response =>  {
        window['gtag']('config', 'UA-123646740-1', {'custom_map': {'dimension1': 'username'}});

        this.angulartics2GoogleGlobalSiteTag.eventTrack('logout', {
          category : 'userAction',
          label : 'logout',
          value : this.user,
          gstCustom : {
            username : this.user.username
          }
        });

      });
    }
  }


  public openUserSettings () {
    this.userSettingsClick.emit(true);
  }
}
