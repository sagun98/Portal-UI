import { dummyBlog } from './../blog-card/blog-card.component.spec';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSideNavigationComponent } from './documentation-side-navigation.component';

describe('DocumentationSideNavigationComponent', () => {
  let component: DocumentationSideNavigationComponent;
  let fixture: ComponentFixture<DocumentationSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      providers : [

      ],
      declarations: [ DocumentationSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationSideNavigationComponent);
    component = fixture.componentInstance;

    component.documentationBlogs = [dummyBlog];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
