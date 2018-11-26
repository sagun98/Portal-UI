import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentationComponent } from './manage-documentation.component';

describe('ManageDocumentationComponent', () => {
  let component: ManageDocumentationComponent;
  let fixture: ComponentFixture<ManageDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
