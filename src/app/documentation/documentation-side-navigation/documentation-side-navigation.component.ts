import { DOCUMENTATION_LANDING_PAGE_LABEL } from '../../core/constants/documentation.constants';
import { UserService } from '../../core/services/user/user.service';
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

  @Input() documentationAreas: DocumentationArea[];
  @Input() currentId: string;
  @Input() currentSlug: string;
  @Input() defaultAllowedDepth: number = 2;

  @Output() blogClick: EventEmitter<BlogPost> = new EventEmitter<BlogPost>();
  public collapsdeState = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService : UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setInitialState(this.documentationAreas);

    this.router.events.subscribe( (event:NavigationEnd) => {
      if( this.router['lastSuccessfulId'] === this.router['navigationId'] ){
        if(this.activatedRoute.children.length && this.activatedRoute.children[0].children.length){
          this.activatedRoute.children[0].children[0].params.subscribe(p => {
            this.currentSlug = p.slug;
            console.log("HERE");
          });
        }
        if(this.activatedRoute.children.length && this.activatedRoute.children[0].snapshot.data.LandingPage){
          this.currentSlug = null;
        }
      }
    });
  }

  public setInitialState (documentationAreas: DocumentationArea[]) {
    this.traverseTreeAndSetState(documentationAreas);
  }

  public traverseTreeAndSetState (documentationAreas: DocumentationArea[]) {
    documentationAreas.forEach(da => {

      let depth = da.slug.split("/").length;

      this.collapsdeState[da.id] = false;

      if(depth >= this.defaultAllowedDepth)
        this.collapsdeState[da.id] = true;
      

      if(da.children && da.children.length){
        this.traverseTreeAndSetState(da.children);
      }
    });
  }

  public captureState (id: string) : void {
    this.collapsdeState[id] = document.querySelector("#n" + id)['checked'];
    console.log(this.collapsdeState);
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

  public get sideNavigationDocumentationAreas () {
    return this.documentationAreas.filter(documentationArea => {
      return documentationArea.name.toLowerCase() !== DOCUMENTATION_LANDING_PAGE_LABEL;
    });
  }
}
