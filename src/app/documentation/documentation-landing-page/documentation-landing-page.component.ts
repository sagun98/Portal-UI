import { DocumentationService } from './../documentation.service';
import { UserService } from '../../core/services/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';
import { UserPrivilegesComponentHelper } from '../../core/classes/user-privileges-helper';
import { DocumentationArea } from '../../core/interfaces/documentation-area.interface';
import { Documentation } from '../../core/interfaces/documentation.interface';

@Component({
  selector: 'app-documentation-landing-page',
  templateUrl: './documentation-landing-page.component.html',
  styleUrls: ['./documentation-landing-page.component.scss']
})
export class DocumentationLandingPageComponent extends UserPrivilegesComponentHelper implements OnInit { 

  @Input() landingPage: BlogPost;
  
  public documentationLandingPageArea: DocumentationArea;

  constructor(
    private activatedRoute:ActivatedRoute,
    private documentationService: DocumentationService,
    private domSanitizer : DomSanitizer,
    private _userService : UserService
  ) { super(_userService); }

  ngOnInit() {
    this.documentationLandingPageArea = this.documentationService.documentationLandingPageArea || {};

    this.activatedRoute.data.subscribe( data => {
      const documentationArea: DocumentationArea = data.LandingPage;
      const landingPage = (documentationArea && documentationArea.documents && documentationArea.documents.length) ? documentationArea.documents[0] : <Documentation> {
        id : '',
        slug : '',
        content : '',
        name : ''
      };

      this.documentationLandingPageArea = documentationArea;
      this.landingPage = landingPage || this.landingPage;
    });
  }

  public get safeBlogPost () {
    return  this.domSanitizer.bypassSecurityTrustHtml( this.landingPage.content );
  }

}
