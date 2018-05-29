import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyParamsComponent } from './body-params.component';

describe('BodyParamsComponent', () => {
  let component: BodyParamsComponent;
  let fixture: ComponentFixture<BodyParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
