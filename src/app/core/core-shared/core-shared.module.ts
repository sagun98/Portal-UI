import { ClarityModule } from '@clr/angular';
import { UserSearchFormComponent } from './user-search-form/user-search-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './has-permission.directive';
import { HasPermissionToDirective } from './has-permission-to.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicContentRoutingDirective } from './dynamic-content-routing.directive';

const DIRECTIVES = [
  HasPermissionDirective,
  HasPermissionToDirective,
  DynamicContentRoutingDirective
]

const COMPONENTS = [
  UserSearchFormComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  exports : [
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreSharedModule { }
