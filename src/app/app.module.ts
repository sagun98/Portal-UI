import { DocumentationModule } from './documentation/documentation.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevPortalCoreModule } from './core/core.module';
import { appRoutes, AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoadingInterceptorProvider } from './core/loading-interceptor/loading-intercptor.interceptor';
import { ErrorInterceptorInterceptor } from './core/interceptors/errors.interceptor';
import { AuthTokenInterceptorProivder } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    ToastrModule.forRoot(),
    DevPortalCoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DocumentationModule
  ],
  
  providers : [
    LoadingInterceptorProvider,
    ErrorInterceptorInterceptor,
    AuthTokenInterceptorProivder,
    ToastrService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
