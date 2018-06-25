import { DocumentationSideNavigationComponent } from './../documentation-side-navigation/documentation-side-navigation.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationComponent } from './documentation.component';
import { dummyBlog } from '../blog-card/blog-card.component.spec';

describe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fixture: ComponentFixture<DocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        RouterTestingModule
      ],
      declarations: [ 
        DocumentationComponent,
        DocumentationSideNavigationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.componentInstance;

    component.landingPage = dummyBlog;
    component.documentationBlogs = [dummyBlog];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
