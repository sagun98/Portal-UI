import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogPost } from './../interfaces/blog-post.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  @Input() landingPage: BlogPost;
  @Input() documentationBlogs : BlogPost[];
  public currentId: string;

  constructor(
    private activatedRoute:ActivatedRoute,
    private domSanitizer : DomSanitizer,
    private router : Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe( data => {
      this.documentationBlogs = data.Blogs || this.documentationBlogs;
    });
  }

  public goToBlog(blog : BlogPost) {
    this.router.navigate([`/blog/documentation/${blog.id}`]).then(navigated => {
      if(navigated)
        this.currentId = blog.id
    });
  }
}
