import { DocumentationModule } from './documentation/documentation.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevPortalCoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routes';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoadingInterceptorProvider } from './core/loading-interceptor/loading-intercptor.interceptor';
import { ErrorInterceptorInterceptor } from './core/interceptors/errors.interceptor';
import { AuthTokenInterceptorProivder } from './core/interceptors/auth.interceptor';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga/angulartics2-ga';

@NgModule({
  declarations: [
    AppComponent,
  ],
  
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    ToastrModule.forRoot(),
    DevPortalCoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DocumentationModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
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
