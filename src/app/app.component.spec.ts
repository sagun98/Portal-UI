import { DevPortalCoreModule } from './core/core.module';
import { LoadingInterceptorModule } from './core/loading-interceptor/loading-interceptor.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
        FormsModule,
        LoadingInterceptorModule,
        DevPortalCoreModule,
        HttpClientModule
      ],
      providers : [
        HttpClient,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});
