import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Swagger2AlertModalComponent } from './swagger2-alert-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Swagger2AlertModalComponent', () => {
  let component: Swagger2AlertModalComponent;
  let fixture: ComponentFixture<Swagger2AlertModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Swagger2AlertModalComponent ],
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Swagger2AlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
