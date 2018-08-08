import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ManageArticleComponent} from './manage-article.component';
import { Component, Directive, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../core/services/user/user.service';
import {DocumentationService} from '../documentation.service';
import {SlugUtilityService} from '../../docs/services/slug.service';
import { MockUserService } from '../../core/layouts/side-navigation/side-navigation.component.spec';
import { EditorModule } from '@tinymce/tinymce-angular';
            
describe('ManageArticleComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgSelectModule,
        EditorModule,
        RouterTestingModule
      ],
      declarations: [
        ManageArticleComponent
      ],
      providers: [
        {provide: UserService, useClass: MockUserService, deps : [HttpClient]},
        DocumentationService,
        SlugUtilityService
      ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ManageArticleComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    // const result = component.ngOnInit();
  }));
        
  it('should run #getServerFormattedTags()', async(() => {
    // const result = component.getServerFormattedTags(tags);
  }));
        
  it('should run #buildForm()', async(() => {
    // const result = component.buildForm();
  }));
        
  it('should run #slugBlur()', async(() => {
    // const result = component.slugBlur(value);
  }));
        
  it('should run #manageDynamiceValidations()', async(() => {
    // const result = component.manageDynamiceValidations();
  }));
        
  it('should run #toggleSubCategoryRequired()', async(() => {
    // const result = component.toggleSubCategoryRequired(value);
  }));
        
  it('should run #handleSubmit()', async(() => {
    // const result = component.handleSubmit();
  }));
        
  it('should run #handleDelete()', async(() => {
    // const result = component.handleDelete();
  }));
        
  it('should run #setDate()', async(() => {
    // const result = component.setDate(date);
  }));
        
});