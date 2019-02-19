import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUserComponent } from './view-user/view-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  { path: '', component: ViewUserComponent},
  { path: 'edit', component: ManageUserComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}
