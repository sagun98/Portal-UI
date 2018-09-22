import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiApiToolsComponent } from './api-api-tools.component';

describe('ApiApiToolsComponent', () => {
  let component: ApiApiToolsComponent;
  let fixture: ComponentFixture<ApiApiToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiApiToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiApiToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
