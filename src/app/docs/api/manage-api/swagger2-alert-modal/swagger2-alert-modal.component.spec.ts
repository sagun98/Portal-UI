import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Swagger2AlertModalComponent } from './swagger2-alert-modal.component';

describe('Swagger2AlertModalComponent', () => {
  let component: Swagger2AlertModalComponent;
  let fixture: ComponentFixture<Swagger2AlertModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Swagger2AlertModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Swagger2AlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
