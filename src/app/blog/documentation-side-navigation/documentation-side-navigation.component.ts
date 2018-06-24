import { ActivatedRoute } from '@angular/router';
import { BlogPost } from './../interfaces/blog-post.interface';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'documentation-side-navigation',
  templateUrl: './documentation-side-navigation.component.html',
  styleUrls: ['./documentation-side-navigation.component.scss']
})
export class DocumentationSideNavigationComponent implements OnInit {

  @Input() documentationBlogs : BlogPost[];
  @Input() currentId : string;
  @Output() blogClick: EventEmitter<BlogPost> = new EventEmitter<BlogPost>();

  public consumeApiBlogs : BlogPost[];
  public creatingApiBlogs: BlogPost[];

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.activatedRoute.children.length)
      this.activatedRoute.children[0].params.subscribe(params => {
        this.currentId = params.blogId || this.currentId;
      });

    this.consumeApiBlogs = this.documentationBlogs.filter( (documentationBlog : BlogPost) => {
      return documentationBlog.subCategory === "Consuming APIs";
    });

    this.creatingApiBlogs = this.documentationBlogs.filter( (documentationBlog : BlogPost) => {
      return documentationBlog.subCategory === "Creating APIs";
    });
  }

  public goToBlog (blog) {
    this.blogClick.emit(blog);
  }
}
