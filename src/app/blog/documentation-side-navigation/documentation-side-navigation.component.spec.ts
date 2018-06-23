import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSideNavigationComponent } from './documentation-side-navigation.component';

describe('DocumentationSideNavigationComponent', () => {
  let component: DocumentationSideNavigationComponent;
  let fixture: ComponentFixture<DocumentationSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
