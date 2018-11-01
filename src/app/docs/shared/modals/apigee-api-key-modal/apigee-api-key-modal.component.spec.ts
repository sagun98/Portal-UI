import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApigeeApiKeyModalComponent } from './apigee-api-key-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockApi } from '../../../product/view-product/view-product.component.spec';

describe('ApigeeApiKeyModalComponent', () => {
  let component: ApigeeApiKeyModalComponent;
  let fixture: ComponentFixture<ApigeeApiKeyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule,
        HttpClientModule
      ],
      providers : [
        HttpClient
      ],
      declarations: [ ApigeeApiKeyModalComponent ],
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApigeeApiKeyModalComponent);
    component = fixture.componentInstance;

    component.api = mockApi;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
