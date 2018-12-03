import { DOCUMENTATION_LANDING_PAGE_LABEL } from './../../core/constants/documentation.constants';
import { UserService } from './../../core/services/user/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';
import { DocumentationArea } from '../../core/interfaces/documentation-area.interface';

@Component({
  selector: 'documentation-side-navigation',
  templateUrl: './documentation-side-navigation.component.html',
  styleUrls: ['./documentation-side-navigation.component.scss']
})
export class DocumentationSideNavigationComponent implements OnInit {

  @Input() documentationBlogs: BlogPost[];
  @Input() documentationAreas: DocumentationArea[];
  @Input() currentId: string;
  @Input() currentSlug: string;
  @Output() blogClick: EventEmitter<BlogPost> = new EventEmitter<BlogPost>();

  public consumeApiBlogs: BlogPost[] = [];
  public creatingApiBlogs: BlogPost[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService : UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe( (event:NavigationEnd) => {
      if( this.router['lastSuccessfulId'] === this.router['navigationId'] ){
        if(this.activatedRoute.children.length && this.activatedRoute.children[0].children.length){
          this.activatedRoute.children[0].children[0].params.subscribe(p => {
            this.currentSlug = p.slug;
          });
        }
        if(this.activatedRoute.children.length && this.activatedRoute.children[0].snapshot.data.LandingPage){
          this.currentSlug = null;
        }
      }
    });
  }

  public editDocumentationArea (slug: string) : void {
    if (this.userService.isAdmin())
      this.router.navigate([`/documentation/area/${slug}/edit`]);
  }

  public addDocumentation (slug: string) {
    this.router.navigate([`/documentation/area/${slug}/new`]);
  }

  public goToBlog(blog) {
    this.blogClick.emit(blog);
  }

  public get sideNavigationDocumentationAreas () {
    return this.documentationAreas.filter(documentationArea => {
      return documentationArea.name.toLowerCase() !== DOCUMENTATION_LANDING_PAGE_LABEL;
    });
  }
}
