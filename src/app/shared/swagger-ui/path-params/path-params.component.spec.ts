import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathParamsComponent } from './path-params.component';

describe('PathParamsComponent', () => {
  let component: PathParamsComponent;
  let fixture: ComponentFixture<PathParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathParamsComponent);
    component = fixture.componentInstance;

    component.params = [{
      name : 'TEST',
      type : 'string',
      desciprtion : 'THIS IS A TEST',
      edit : false
    }];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});