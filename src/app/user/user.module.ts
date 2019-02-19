import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserRoutingModule } from './user-routing.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      ViewUserComponent,
      ManageUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ]
})
export class UserModule {}
