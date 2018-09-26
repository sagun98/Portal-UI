import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApigeeManagementFormComponent } from './apigee-management-form.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

describe('ApigeeManagementFormComponent', () => {
  let component: ApigeeManagementFormComponent;
  let fixture: ComponentFixture<ApigeeManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers : [
        HttpClient
      ],
      declarations: [ ApigeeManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApigeeManagementFormComponent);
    component = fixture.componentInstance;

    component.parentForm = new FormGroup({});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
