import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';

@Component({
  selector: 'app-documentation-landing-page',
  templateUrl: './documentation-landing-page.component.html',
  styleUrls: ['./documentation-landing-page.component.scss']
})
export class DocumentationLandingPageComponent implements OnInit {

  @Input() landingPage: BlogPost;

  constructor(
    private activatedRoute:ActivatedRoute,
    private domSanitizer : DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe( data => {
      this.landingPage = data.LandingPage || this.landingPage;
    });
  }

  public get safeBlogPost () {
    return  this.domSanitizer.bypassSecurityTrustHtml( this.landingPage.content );
  }

}
