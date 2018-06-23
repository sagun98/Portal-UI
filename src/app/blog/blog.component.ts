import { BlogPost } from './interfaces/blog-post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input() blogs: BlogPost[];

  constructor(
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.blogs = data.Blogs || this.blogs;
    });
  }

  public openBlogPost (blog: BlogPost) {
    this.router.navigate([`../post/${blog.id}`], {relativeTo: this.activatedRoute})
  }

}
