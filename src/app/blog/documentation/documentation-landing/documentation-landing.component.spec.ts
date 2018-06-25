import { dummyBlog } from './../../blog-card/blog-card.component.spec';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentationLandingComponent } from './documentation-landing.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('DocumentationLandingComponent', () => {
  let component: DocumentationLandingComponent;
  let fixture: ComponentFixture<DocumentationLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      declarations: [ DocumentationLandingComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationLandingComponent);
    component = fixture.componentInstance;

    component.landingPage = dummyBlog;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
