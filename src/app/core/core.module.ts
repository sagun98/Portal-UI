import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInterceptorModule } from './loading-interceptor/loading-interceptor.module';
import { CoreSharedModule } from './core-shared/core-shared.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    LoadingInterceptorModule,
    CoreSharedModule
  ],
  declarations: [],
  exports : [
    LayoutsModule,
    LoadingInterceptorModule,
    CoreSharedModule
  ]
})
export class DevPortalCoreModule {
  
}
