import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user/view-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
      UserComponent,
      ViewUserComponent,
      ManageUserComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule {}
