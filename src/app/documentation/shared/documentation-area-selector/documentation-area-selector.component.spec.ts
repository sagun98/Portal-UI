import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationAreaSelectorComponent } from './documentation-area-selector.component';

describe('DocumentationAreaSelectorComponent', () => {
  let component: DocumentationAreaSelectorComponent;
  let fixture: ComponentFixture<DocumentationAreaSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationAreaSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAreaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
