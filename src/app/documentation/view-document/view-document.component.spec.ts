import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreSharedModule } from './../../core/core-shared/core-shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewDocumentComponent } from './view-document.component';
import { BlogPost } from '../interfaces/blog-post.interface';
import { ActivatedRoute } from '@angular/router';

const mockBlogPost = <BlogPost> {
  "title" : "Mock Title",
  "tags" : [],
  "summary" : "this is a summary",
  "slug" : "mock-blog",
  "published" : true,
  "publicationDate" : new Date(),
  "image" : null,
  "id" : "asdf1234",
  "content" : "<p>some content</p>",
  "comments" : [],
  "category" : "main-page",
  "author" : "UTESTT4",
  "allowComments" : false
}

describe('ViewDocumentComponent', () => {
  let component: ViewDocumentComponent;
  let fixture: ComponentFixture<ViewDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule,
        HttpClientModule,
        CoreSharedModule
      ],
      providers : [
        HttpClient,
        {provide : ActivatedRoute, useValue : {
            data : of({
              BlogPost : mockBlogPost
            }),
            snapshot : {}
          }
        }
      ],
      declarations: [ ViewDocumentComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});