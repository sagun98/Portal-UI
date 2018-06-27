import { dummyBlog } from './../blog-card/blog-card.component.spec';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlogComponent } from './view-blog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewBlogComponent', () => {
  let component: ViewBlogComponent;
  let fixture: ComponentFixture<ViewBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      declarations: [ ViewBlogComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBlogComponent);
    component = fixture.componentInstance;

    component.blogPost = dummyBlog;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take a blog as an input', () => {
    expect(component.blogPost.id).toEqual(dummyBlog.id);
    expect(component.blogPost.content).toEqual(dummyBlog.content);
    expect(component.blogPost.summary).toEqual(dummyBlog.summary);
    expect(component.blogPost.author).toEqual(dummyBlog.author);
    expect(component.blogPost.category).toEqual(dummyBlog.category);
  })
});
