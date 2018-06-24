import { ActivatedRoute } from '@angular/router';
import { BlogPost } from './../interfaces/blog-post.interface';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'blog-side-navigation',
  templateUrl: './blog-side-navigation.component.html',
  styleUrls: ['./blog-side-navigation.component.scss']
})
export class BlogSideNavigationComponent implements OnInit {

  @Input() blogPosts: BlogPost[];
  @Input() currentId: number;
  @Output() blogClick: EventEmitter<BlogPost> = new EventEmitter<BlogPost>();

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.activatedRoute.children[0])
      this.activatedRoute.children[0].params.subscribe(params => {
        this.currentId = params.blogId || this.currentId;
      });

  }

  public onBlogClick (blog : BlogPost) {
    this.blogClick.emit(blog);
  }

}
