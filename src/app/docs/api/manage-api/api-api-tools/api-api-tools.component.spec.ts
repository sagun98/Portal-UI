import { API_MANAGEMENT_TOOLS_ARRAY } from '../../../../core/constants/api-tools.constants';
import { API_MANAGEMENT_TOOLS } from '../../../../core/enums/api-management-tools.enum';
import { mockApi } from '../../../product/view-product/view-product.component.spec';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
// tslint:disble
import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';

import {ApiApiToolsComponent} from './api-api-tools.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormBuilder} from '@angular/forms';

describe('ApiApiToolsComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        ApiApiToolsComponent
      ],
      providers: [
        FormBuilder,
        HttpClient
      ],
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ApiApiToolsComponent);
    
    component = fixture.debugElement.componentInstance;

    component.parentForm = new FormGroup({});
    component.api = mockApi;

    fixture.detectChanges();
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    expect(component.api).toEqual(mockApi);
    expect(component.form.get('name').value).toEqual(API_MANAGEMENT_TOOLS.APIGEE);
    expect(component.parentForm.get('apiManagementTool')).toEqual(component.form);
  }));
        
  it('should run #buildForm()', async(() => {
    expect(component.form.get('name').value).toEqual(API_MANAGEMENT_TOOLS.APIGEE);
  }));
        
  it('should run #handleNameChange()', fakeAsync(() => {
    expect( Object.keys(component.parentForm.controls).length ).toEqual(1);

    component.form.get('name').setValue( component.apiManagementTools[0].value );

    tick();

    expect( Object.keys(component.parentForm.controls).length ).toEqual(0);
  }));
        
});