import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationAreaComponent } from './documentation-area.component';

describe('DocumentationAreaComponent', () => {
  let component: DocumentationAreaComponent;
  let fixture: ComponentFixture<DocumentationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
