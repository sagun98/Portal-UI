import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IPortalUser } from 'src/app/core/interfaces/fr-user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    mode: string = 'list';

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.userStateChange.subscribe(result => {
            this.stateChange(result);
        });
    }

    private stateChange(newState: string) {
        this.mode = newState;
    }

}