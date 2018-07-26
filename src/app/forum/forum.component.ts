import { ActivatedRoute, Router } from '@angular/router';
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

    if(this.activatedRoute.children.length){
      const extraPath = this.activatedRoute.children[0].url['value'].join('/');
      this.forumURL = this.domSanitizer.bypassSecurityTrustResourceUrl ( environment.forumBase + '/' + extraPath );
    }
  }

}
