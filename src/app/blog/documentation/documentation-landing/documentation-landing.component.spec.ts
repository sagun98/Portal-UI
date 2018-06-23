import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationLandingComponent } from './documentation-landing.component';

describe('DocumentationLandingComponent', () => {
  let component: DocumentationLandingComponent;
  let fixture: ComponentFixture<DocumentationLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
