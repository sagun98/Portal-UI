import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInterceptorComponent } from './loading-interceptor.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LoadingInterceptorComponent
  ],
  exports : [
    LoadingInterceptorComponent
  ]
})
export class LoadingInterceptorModule { }
