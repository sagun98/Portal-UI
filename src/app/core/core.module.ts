import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInterceptorModule } from './loading-interceptor/loading-interceptor.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    LoadingInterceptorModule
  ],
  declarations: [],
  exports : [
    LayoutsModule,
    LoadingInterceptorModule
  ]
})
export class DevPortalCoreModule {
  
}
