import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './has-permission.directive';
import { HasPermissionToDirective } from './has-permission-to.directive';

const DIRECTIVES = [
  HasPermissionDirective,
  HasPermissionToDirective
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...DIRECTIVES
  ],
  exports : [
    ...DIRECTIVES
  ]
})
export class CoreSharedModule { }
