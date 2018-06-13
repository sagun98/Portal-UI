import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevPortalCoreModule } from './core/core.module';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { LoadingInterceptorProvider } from './core/loading-interceptor/loading-intercptor.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    DevPortalCoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash : true}
    )
  ],
  
  providers : [
    LoadingInterceptorProvider
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
