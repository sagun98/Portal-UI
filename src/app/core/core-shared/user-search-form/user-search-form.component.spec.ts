import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {UserSearchFormComponent} from './user-search-form.component';
import {Component, Directive} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from '../../services/user/user.service';

class MockUserService extends UserService {
}
      
describe('UserSearchFormComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        UserSearchFormComponent
      ],
      providers: [
        FormBuilder,
        {provide: UserService, useClass: MockUserService},
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(UserSearchFormComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    // const result = component.ngOnInit();
  }));
        
  it('should run #buildForm()', async(() => {
    // const result = component.buildForm();
  }));
        
  it('should run #handleSubmit()', async(() => {
    // const result = component.handleSubmit();
  }));
        
});