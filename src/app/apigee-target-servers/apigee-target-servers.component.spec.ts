import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApigeeTargetServersComponent } from './apigee-target-servers.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApigeeTargetServersComponent', () => {
  let component: ApigeeTargetServersComponent;
  let fixture: ComponentFixture<ApigeeTargetServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ ApigeeTargetServersComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApigeeTargetServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
