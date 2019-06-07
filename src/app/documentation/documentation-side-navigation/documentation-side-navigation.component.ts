import { Documentation } from './../../core/interfaces/documentation.interface';
import { DOCUMENTATION_LANDING_PAGE_LABEL } from '../../core/constants/documentation.constants';
import { UserService } from '../../core/services/user/user.service';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';
import { DocumentationArea } from '../../core/interfaces/documentation-area.interface';

@Component({
  selector: 'documentation-side-navigation',
  templateUrl: './documentation-side-navigation.component.html',
  styleUrls: ['./documentation-side-navigation.component.scss']
})
export class DocumentationSideNavigationComponent implements OnInit {

  @Input() documentationAreas: DocumentationArea[];
  @Input() currentId: string;
  @Input() currentSlug: string;
  @Input() defaultAllowedDepth: number = 3;

  @Output() blogClick: EventEmitter<BlogPost> = new EventEmitter<BlogPost>();
  
  public collapsdeState = {};
  public sideNavigationDocumentationAreas: DocumentationArea[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService : UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setInitialState(this.documentationAreas);

    this.sideNavigationDocumentationAreas = this.documentationAreas.filter(documentationArea => {
      return documentationArea.name.toLowerCase() !== DOCUMENTATION_LANDING_PAGE_LABEL;
    });

    console.log(this.sideNavigationDocumentationAreas);

    this.router.events.subscribe( (event:NavigationEnd) => {
      if( this.router['lastSuccessfulId'] === this.router['navigationId'] ){
        if(this.activatedRoute.children.length && this.activatedRoute.children[0].children.length){
          this.activatedRoute.children[0].children[0].data.subscribe(data=> {
            if(data && data.Documentation){
              this.currentId = data.Documentation.id;
            }
            else {
              this.currentId = null;
            }
          });
        }
      }
    });
  }

  ngOnChanges () {
    this.sideNavigationDocumentationAreas = this.documentationAreas.filter(documentationArea => {
      return documentationArea.name.toLowerCase() !== DOCUMENTATION_LANDING_PAGE_LABEL;
    });
  }

  private setInitialState (documentationAreas: DocumentationArea[]) {
    let documentation: Documentation = this.traverseRouterChildrenForDocumentation(this.activatedRoute.snapshot);

    this.traverseTreeAndSetState(documentationAreas, documentation);
  }

  private traverseTreeAndSetState (documentationAreas: DocumentationArea[], documentation: Documentation) {
    documentationAreas.forEach(da => {

      let depth = da.slug.split("/").length;

      this.collapsdeState[da.id] = false;

      let isCurrentAncestor: boolean = ( documentation && (documentation.slug.startsWith(da.slug)) )

      if(depth >= this.defaultAllowedDepth && ! isCurrentAncestor)
        this.collapsdeState[da.id] = true;
      
      if(da.children && da.children.length){
        this.traverseTreeAndSetState(da.children, documentation);
      }
    });
  }

  private traverseRouterChildrenForDocumentation (snapshot: ActivatedRouteSnapshot) : Documentation {
    let children : ActivatedRouteSnapshot[] = snapshot.children;

    if(children.length){
      return this.traverseRouterChildrenForDocumentation(children[0]);
    }
    else {
      return snapshot.data.Documentation;
    }
  }

  public captureState (id: string) : void {
    this.collapsdeState[id] = document.querySelector("#n" + id)['checked'];
  }

  public editDocumentationArea (id: string) : void {
    if (this.userService.isAdmin())
      this.router.navigate([`/documentation/area/${id}/edit`]);
  }

  public addDocumentation (id: string) {
    this.router.navigate([`/documentation/area/${id}/new`]);
  }

  public goToBlog(blog) {
    this.blogClick.emit(blog);
  }
  // public get sideNavigationDocumentationAreas () {
  //   return this.documentationAreas.filter(documentationArea => {
  //     return documentationArea.name.toLowerCase() !== DOCUMENTATION_LANDING_PAGE_LABEL;
  //   });
  // }
}
