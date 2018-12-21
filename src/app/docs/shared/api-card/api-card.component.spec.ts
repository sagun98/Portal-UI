import { mockApi } from '../../product/view-product/view-product.component.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCardComponent } from './api-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApiCardComponent', () => {
  let component: ApiCardComponent;
  let fixture: ComponentFixture<ApiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ApiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardComponent);
    component = fixture.componentInstance;

    component.api = mockApi;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
