import { mockApi } from './../../product/view-product/view-product.component.spec';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiVersionSelectorComponent } from './api-version-selector.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApiVersionSelectorComponent', () => {
  let component: ApiVersionSelectorComponent;
  let fixture: ComponentFixture<ApiVersionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      declarations: [ ApiVersionSelectorComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiVersionSelectorComponent);
    component = fixture.componentInstance;

    component.api = mockApi;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
