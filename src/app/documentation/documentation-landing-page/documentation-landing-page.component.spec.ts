import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationLandingPageComponent } from './documentation-landing-page.component';

describe('DocumentationLandingPageComponent', () => {
  let component: DocumentationLandingPageComponent;
  let fixture: ComponentFixture<DocumentationLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
