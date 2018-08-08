import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DocumentationSideNavigationComponent} from './documentation-side-navigation.component';
import {Component, Directive} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

describe('DocumentationSideNavigationComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      declarations: [
        DocumentationSideNavigationComponent
      ],
      providers: [
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(DocumentationSideNavigationComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    // const result = component.ngOnInit();
  }));
        
  it('should run #addDocumentation()', async(() => {
    // const result = component.addDocumentation(subCategory);
  }));
        
  it('should run #goToBlog()', async(() => {
    // const result = component.goToBlog(blog);
  }));
        
});