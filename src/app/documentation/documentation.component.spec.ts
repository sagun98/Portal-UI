import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DocumentationComponent} from './documentation.component';
import {Component, Directive} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';

describe('DocumentationComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        DocumentationComponent
      ],
      providers: [
      
      ],
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    // const result = component.ngOnInit();
  }));
        
  it('should run #goToBlog()', async(() => {
    // const result = component.goToBlog(blog);
  }));
        
  it('should run #scrollTop()', async(() => {
    // const result = component.scrollTop();
  }));
        
});