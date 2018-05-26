import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule
  ],
  declarations: [],
  exports : [
    LayoutsModule
  ]
})
export class DevPortalCoreModule {
  
}
