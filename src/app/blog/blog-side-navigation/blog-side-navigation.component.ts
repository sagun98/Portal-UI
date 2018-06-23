import { BlogPost } from './../interfaces/blog-post.interface';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'blog-side-navigation',
  templateUrl: './blog-side-navigation.component.html',
  styleUrls: ['./blog-side-navigation.component.scss']
})
export class BlogSideNavigationComponent implements OnInit {

  @Input() blogPosts: BlogPost[];
  @Output() blogClick: EventEmitter<BlogPost> = new EventEmitter<BlogPost>();

  constructor() { }

  ngOnInit() {
  }

  public onBlogClick (blog : BlogPost) {
    this.blogClick.emit(blog);
  }

}
