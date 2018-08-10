// tslint:disble
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DocumentationLandingPageComponent} from './documentation-landing-page.component';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DocumentationLandingPageComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      declarations: [
        DocumentationLandingPageComponent
      ],
      providers: [
       
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