import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogPost } from '../../interfaces/blog-post.interface';

@Component({
  selector: 'documentation-landing',
  templateUrl: './documentation-landing.component.html',
  styleUrls: ['./documentation-landing.component.scss']
})
export class DocumentationLandingComponent implements OnInit {

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
