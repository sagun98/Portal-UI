import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

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
