import { BlogPost } from './../interfaces/blog-post.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'documentation-side-navigation',
  templateUrl: './documentation-side-navigation.component.html',
  styleUrls: ['./documentation-side-navigation.component.scss']
})
export class DocumentationSideNavigationComponent implements OnInit {

  @Input() documentationBlogs : BlogPost[];
  public consumeApiBlogs : BlogPost[];
  public creatingApiBlogs: BlogPost[];

  constructor() { }

  ngOnInit() {

    this.consumeApiBlogs = this.documentationBlogs.filter( (documentationBlog : BlogPost) => {
      return documentationBlog.subCategory === "Consuming APIs";
    });

    this.creatingApiBlogs = this.documentationBlogs.filter( (documentationBlog : BlogPost) => {
      return documentationBlog.subCategory === "Creating APIs";
    });
  }
}
