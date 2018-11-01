import { PermissionsService } from './../../../services/permissions/permissions.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PortalUser } from '../../../interfaces/fr-user.interface';

@Component({
  selector: 'role-card',
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.scss']
})
export class RoleCardComponent implements OnInit {

  @Input() title: string;
  @Input() role: string;
  @Input() user: PortalUser;
  @Output() roleRequested: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private permissionService: PermissionsService
  ) { }

  ngOnInit() {
  }

  get hasRole () : boolean {
    return this.permissionService.hasRole([this.role, 'ADMIN'], this.user.roles );
  }

}
