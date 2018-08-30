import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.blogPost = data.BlogPost || this.blogPost;

      setTimeout(t => {
        //this.fixInternalRouting();
      }, 100);
    });
  }

  public get safeBlogPost () {
    return this.domSanitizer.bypassSecurityTrustHtml( this.blogPost.content );
  }

  private fixInternalRouting () {
    document.querySelector(".documentation-body")['onclick'] = (event:Event) => {
      const target = <Element> event.target
      const type = target.tagName.toLowerCase();

      if(type === 'a'){
        let href = target['href'];
        let portalBase = window.location.protocol + '//' + window.location.host;

        if( href.indexOf(portalBase) != -1 || href.indexOf(environment.forumBase) != -1){
          event.preventDefault();
          event.stopPropagation();
          
          href = href.replace(portalBase, '').replace(environment.forumBase, '');
          this.router.navigate([href]);
          return;
        }        
      }
    }
  }
}
