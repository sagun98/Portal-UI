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
import { Angulartics2GoogleGlobalSiteTagOverride } from './shared/angulartics-2-google-global-site-tag-override.service';
import { ApigeeTargetServersComponent } from './apigee-target-servers/apigee-target-servers.component';

@NgModule({
   declarations: [
      AppComponent,
      ApigeeTargetServersComponent
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
      Angulartics2Module.forRoot([Angulartics2GoogleGlobalSiteTagOverride])
   ],
   providers: [
      LoadingInterceptorProvider,
      ErrorInterceptorInterceptor,
      AuthTokenInterceptorProivder,
      ToastrService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
