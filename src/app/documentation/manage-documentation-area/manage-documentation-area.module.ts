import { DocumentationNewResolve } from '../resolves/documentation.new.resolve';
import { RouterModule, Route } from '@angular/router';
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
import { DocumentationSharedModule } from '../shared/shared.module';

const editRouteString = [':l0/:slug/edit', ':l0/:l1/:slug/edit', ':l0/l1:/l2/:slug/edit'];
const editRoutesDynamic:Route[] = [];

const editDocumentRoutesStatic = [
  {path : ":l0/:slug/edit", component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
    Documentation : DocumentationNewResolve,
    DocumentationArea : DocumentationAreaResolve
  }},

  {path : ":l0/:l1/:slug/edit", component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
    Documentation : DocumentationNewResolve,
    DocumentationArea : DocumentationAreaResolve
  }},

  {path : ":l0/l1:/l2/:slug/edit", component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
    Documentation : DocumentationNewResolve,
    DocumentationArea : DocumentationAreaResolve
  }}
];

editRouteString.forEach(path => {
  editRoutesDynamic.push(
    {path : path, component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
      Documentation : DocumentationNewResolve,
      DocumentationArea : DocumentationAreaResolve
    }}
  )
});

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    CoreSharedModule,
    DocumentationSharedModule,
    RouterModule.forChild([
      { path : 'new', component : ManageDocumentationAreaComponent, data : {permissions : ['ADMIN']}, canActivate : [RoleCheckGuard]},
      { path : ':id/edit', component : ManageDocumentationAreaComponent, data : {permissions : ['ADMIN']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {DocumentationArea : DocumentationAreaResolve}},
      { path : ':id/new', component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
        DocumentationArea : DocumentationAreaResolve
      }},

      { path : ':id/document/:slug/edit', component :  ManageDocumentationComponent, data : {permissions : ['ADMIN', 'DOCUMENTATION_CONTRIBUTOR']}, canDeactivate : [VerifyLeaveGuard], canActivate : [RoleCheckGuard], resolve : {
        Documentation : DocumentationNewResolve,
        DocumentationArea : DocumentationAreaResolve
      }},

      {path : ":l0/:id", component : ViewDocumentComponent, resolve : {Documentation : DocumentationNewResolve, DocumentationArea : DocumentationAreaResolve}},      

      {path : ":l0/:l1/:id", component : ViewDocumentComponent, resolve : {Documentation : DocumentationNewResolve, DocumentationArea : DocumentationAreaResolve}},

      {path : ":l0/:l1/:l2/:id", component : ViewDocumentComponent, resolve : {Documentation : DocumentationNewResolve, DocumentationArea : DocumentationAreaResolve}}
    ])
  ],
  
  declarations: [ManageDocumentationAreaComponent],

  exports : [ManageDocumentationAreaComponent]
})
export class ManageDocumentationAreaModule { }
