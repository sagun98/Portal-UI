import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPermissionsModalComponent } from './entity-permissions-modal.component';

describe('EntityPermissionsModalComponent', () => {
  let component: EntityPermissionsModalComponent;
  let fixture: ComponentFixture<EntityPermissionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPermissionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPermissionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
