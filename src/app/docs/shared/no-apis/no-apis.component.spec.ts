import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoApisComponent } from './no-apis.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NoApisComponent', () => {
  let component: NoApisComponent;
  let fixture: ComponentFixture<NoApisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ NoApisComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
