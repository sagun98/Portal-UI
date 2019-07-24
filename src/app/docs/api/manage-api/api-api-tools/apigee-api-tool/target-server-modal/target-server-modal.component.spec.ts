import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetServerModalComponent } from './target-server-modal.component';

describe('TargetServerModalComponent', () => {
  let component: TargetServerModalComponent;
  let fixture: ComponentFixture<TargetServerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetServerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetServerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
