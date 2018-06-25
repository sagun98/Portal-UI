import { BlogPost } from './../interfaces/blog-post.interface';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogCardComponent } from './blog-card.component';

export const dummyBlog : BlogPost = {
  id : 'asdf1234',
  title  : 'This is a dummyBlog',
  publicationDate : '09/14/1986',
  published : true,
  author : 'DCARTER',
  content : '<div>this is some HTML content',
  category : 'Documentation',
  subCategory : 'Documentation Landing Page',
  summary : 'This is a summary',
  allowComments : true,
  tags : ['this']
}

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
    component.blog = dummyBlog;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the blog summary in the card-text div', () => { 
    const cardTextDiv = document.querySelector(".card-text > span");
    const cardTextDivHTML = cardTextDiv.innerHTML.trim();
    expect(cardTextDivHTML).toEqual(component.blog.summary);
  })

  it('should render the blog author to the bottom left of the card', () => { 
    const div = document.querySelector(".card-footer > .pull-left");
    const divHTML = div.innerHTML.trim();
    expect(divHTML).toEqual(component.blog.author);
  })

  it('should render the blog title in the card title', () => { 
    const div = document.querySelector(".card-header");
    const divHTML = div.innerHTML.trim();
    expect(divHTML).toEqual( component.blog.title );
  });
});
