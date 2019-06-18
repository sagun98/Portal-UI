import { CookieParserService } from './../../core/services/cookie-parser/cookie-parser.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
// tslint:disble
import { async, TestBed } from '@angular/core/testing';
import {DocumentationLandingPageComponent} from './documentation-landing-page.component';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../core/services/user/user.service';
import { MockUserService } from '../../core/layouts/side-navigation/side-navigation.component.spec';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

      
describe('DocumentationLandingPageComponent', () => {
  let fixture;
  let component;

  let activatedRouteValue = {
    data : of({
      LandingPage : ''
    }),
    snapshot: {
      data: { 
        LandingPage : ''
      }
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        DocumentationLandingPageComponent
      ],
      providers: [
        HttpClient,
        { provide: ActivatedRoute, useValue : activatedRouteValue },
        DomSanitizer,
        { provide: UserService, useClass: MockUserService, deps : [HttpClient, CookieParserService] }
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(DocumentationLandingPageComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    // const result = component.ngOnInit();
  }));
        
});