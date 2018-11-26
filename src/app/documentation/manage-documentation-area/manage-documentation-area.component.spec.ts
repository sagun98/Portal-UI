import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentationAreaComponent } from './manage-documentation-area.component';

describe('ManageDocumentationAreaComponent', () => {
  let component: ManageDocumentationAreaComponent;
  let fixture: ComponentFixture<ManageDocumentationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocumentationAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
