import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApigeeManagementFormComponent } from './apigee-management-form.component';

describe('ApigeeManagementFormComponent', () => {
  let component: ApigeeManagementFormComponent;
  let fixture: ComponentFixture<ApigeeManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApigeeManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApigeeManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
