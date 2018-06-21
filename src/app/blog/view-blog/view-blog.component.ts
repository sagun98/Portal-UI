import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  @Input() blogPost : BlogPost;

  constructor(
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe(data => {
      this.blogPost = data.BlogPost || this.blogPost;
    })

  }

  public get safeBlogPost () {
    return this.domSanitizer.bypassSecurityTrustHtml( this.blogPost.content );
  }

}
