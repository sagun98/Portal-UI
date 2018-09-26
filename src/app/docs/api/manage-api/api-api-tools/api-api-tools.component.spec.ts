import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiApiToolsComponent } from './api-api-tools.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { API } from '../../interfaces/api.interface';
import { mockApi } from '../../../product/view-product/view-product.component.spec';

describe('ApiApiToolsComponent', () => {
  let component: ApiApiToolsComponent;
  let fixture: ComponentFixture<ApiApiToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ ApiApiToolsComponent ],
     
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiApiToolsComponent);
    
    component = fixture.componentInstance;

    component.api = mockApi;
    component.parentForm = new FormGroup({

    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
