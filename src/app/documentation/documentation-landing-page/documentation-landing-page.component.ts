import { UserService } from '../../core/services/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';
import { UserPrivilegesComponentHelper } from '../../core/classes/user-privileges-helper';

@Component({
  selector: 'app-documentation-landing-page',
  templateUrl: './documentation-landing-page.component.html',
  styleUrls: ['./documentation-landing-page.component.scss']
})
export class DocumentationLandingPageComponent extends UserPrivilegesComponentHelper implements OnInit { 

  @Input() landingPage: BlogPost;

  constructor(
    private activatedRoute:ActivatedRoute,
    private domSanitizer : DomSanitizer,
    private _userService : UserService
  ) { super(_userService); }

  ngOnInit() {
    this.activatedRoute.data.subscribe( data => {
      this.landingPage = data.LandingPage || this.landingPage;
    });
  }

  public get safeBlogPost () {
    return  this.domSanitizer.bypassSecurityTrustHtml( this.landingPage.content );
  }

}
