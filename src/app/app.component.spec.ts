import { ActiveLinkDirective } from './core/layouts/sub-navigation/active-link.directive';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './core/layouts/header/header.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SideNavigationComponent } from './core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { SubNavigationComponent } from './core/layouts/sub-navigation/sub-navigation.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        RouterModule.forRoot([]),
        FormsModule,
        HttpClientModule
      ],
      providers : [
        HttpClient,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      declarations: [
        AppComponent,
        SideNavigationComponent,
        SubNavigationComponent,
        HeaderComponent,
        ActiveLinkDirective
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
