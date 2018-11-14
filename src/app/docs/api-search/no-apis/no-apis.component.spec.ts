import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoApisComponent } from './no-apis.component';

describe('NoApisComponent', () => {
  let component: NoApisComponent;
  let fixture: ComponentFixture<NoApisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoApisComponent ]
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
