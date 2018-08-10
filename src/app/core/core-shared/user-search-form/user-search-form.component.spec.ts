import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {UserSearchFormComponent} from './user-search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import { MockUserService } from '../../layouts/side-navigation/side-navigation.component.spec';

describe('UserSearchFormComponent', () => {
  let fixture: ComponentFixture<UserSearchFormComponent>;
  let component: UserSearchFormComponent;
  const formFields = ['username'];

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
        { provide: UserService, useClass: MockUserService, deps : [HttpClient] },
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(UserSearchFormComponent);
    component = fixture.debugElement.componentInstance;
  });

  beforeEach(() => {
    component.username = '';
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    component.ngOnInit();

    formFields.forEach(fieldName => {
      expect(component.form.get(fieldName).value).toEqual("")
    });
  }));
        
        
  it('should use input value username', async(() => {
    component.username = 'derek';

    fixture.detectChanges();

    component.ngOnInit();

    expect(component.form.get('username').value).toEqual("derek")
  }));
        
});