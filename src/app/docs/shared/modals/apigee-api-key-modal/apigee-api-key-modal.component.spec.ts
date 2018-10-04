import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApigeeApiKeyModalComponent } from './apigee-api-key-modal.component';

describe('ApigeeApiKeyModalComponent', () => {
  let component: ApigeeApiKeyModalComponent;
  let fixture: ComponentFixture<ApigeeApiKeyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApigeeApiKeyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApigeeApiKeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
