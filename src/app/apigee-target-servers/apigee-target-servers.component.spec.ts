import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApigeeTargetServersComponent } from './apigee-target-servers.component';

describe('ApigeeTargetServersComponent', () => {
  let component: ApigeeTargetServersComponent;
  let fixture: ComponentFixture<ApigeeTargetServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApigeeTargetServersComponent ]
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
