import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApigeeApiToolComponent } from './apigee-api-tool.component';

describe('ApigeeApiToolComponent', () => {
  let component: ApigeeApiToolComponent;
  let fixture: ComponentFixture<ApigeeApiToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApigeeApiToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApigeeApiToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
