import { DocumentationNewResolve } from '../resolves/documentation.new.resolve';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDocumentationAreaComponent } from './manage-documentation-area.component';
import { ClarityModule } from '@clr/angular';
import { CoreSharedModule } from '../../core/core-shared/core-shared.module';
import { RoleCheckGuard } from '../../core/guards/role-check/role-check.guard';
import { VerifyLeaveGuard } from '../../core/guards/verify-leave/verify-leave.guard';
import { DocumentationAreaResolve } from '../resolves/documentation-area.resolve';
import { ManageDocumentationComponent } from '../manage-documentation/manage-documentation.component';
import { ViewDocumentComponent } from '../view-document/view-document.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    CoreSharedModule,
    RouterModule.forChild([
      { path : 'new', component : ManageDocumentationAreaComponent, data : {permissions : ['ADMIN']}, canActivate : [RoleCheckGuard]},
      { path : ':id/edit', component : ManageDocumentationAreaComponent, data : {permissions : ['ADMIN']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {DocumentationArea : DocumentationAreaResolve}},
      { path : ':id/new', component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
        DocumentationArea : DocumentationAreaResolve
      }},
      { path : ':id/:slug', component :  ViewDocumentComponent, resolve : {Documentation : DocumentationNewResolve}},
      { path : ':id/:slug/edit', component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
        Documentation : DocumentationNewResolve,
        DocumentationArea : DocumentationAreaResolve
      }}
    ])
  ],
  
  declarations: [ManageDocumentationAreaComponent],

  exports : [ManageDocumentationAreaComponent]
})
export class ManageDocumentationAreaModule { }
