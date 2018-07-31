import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './has-permission.directive';

const DIRECTIVES = [
  HasPermissionDirective
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
