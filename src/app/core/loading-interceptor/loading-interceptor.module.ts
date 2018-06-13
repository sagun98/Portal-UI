import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInterceptorComponent } from './loading-interceptor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingInterceptorComponent
  ],
  exports : [
    LoadingInterceptorComponent
  ]
})
export class LoadingInterceptorModule { }
