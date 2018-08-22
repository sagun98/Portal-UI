import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public forumURL:SafeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl ( environment.forumBase );

  constructor(
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe( (urlSegments:UrlSegment[]) => {
      const extraPath = urlSegments.map(segment => {return segment.path}).join('/');
      this.forumURL = this.domSanitizer.bypassSecurityTrustResourceUrl ( environment.forumBase + '/' + extraPath );

      var iframe = document.querySelector("iframe");

      setTimeout(t => {
        iframe.contentWindow.postMessage(window.location.origin, "*");
      }, 1000);
    });
  }

}
