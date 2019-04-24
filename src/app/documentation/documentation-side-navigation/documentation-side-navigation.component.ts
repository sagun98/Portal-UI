import { DOCUMENTATION_LANDING_PAGE_LABEL } from '../../core/constants/documentation.constants';
import { UserService } from '../../core/services/user/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post.interface';
import { DocumentationArea } from '../../core/interfaces/documentation-area.interface';
import { Documentation } from '../../core/interfaces/documentation.interface';

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

  public collapsdeState = {};
  public dummyDocumentationAreas: DocumentationArea[] = [
    {
      id : 'asdf11',
      name : 'Test1',
      description : 'Description1',
      slug : 'test1',
      position : 1,
      parent : null,
      documents : [
        <Documentation> {
          id : 'asdf1114',
          name : 'Documetation3',
          description : "Description",
          parentSlug : 'test1',
          content : '<b>this is a test </b>'
        },
        <Documentation> {
          id : 'asdf1115',
          name : 'Documetation4',
          description : "Description",
          parentSlug : 'test1',
          content : '<b>this is a test </b>'
        }
      ],
      children : [
        <DocumentationArea> {
          id : 'asdf1122',
          name : 'TEST 10',
          description : 'TEST 10 Description',
          slug : 'test10',
          position : 1,
          children : [],
          documents : [
            <Documentation> {
              id : 'asdf1123',
              name : 'Documetation11',
              description : "Description",
              parentSlug : 'test/test10',
              content : '<b>this is a test </b>'
            }
          ]
        },
        <DocumentationArea> {
          id : 'asdf12',
          name : 'Test2',
          description : 'Description2',
          slug : 'test2',
          position : 1,
          parent : 'asdf11',
          children : [
            <DocumentationArea> {
              id : 'asdf17',
              name : 'Test4',
              description : 'Description4',
              slug : 'test2',
              position : 1,
              parent : 'asdf12',
              documents : [
                <Documentation> {
                  id : 'asdf1116',
                  name : 'Documetation6',
                  description : "Description",
                  parentSlug : 'test1/test2',
                  content : '<b>this is a test </b>'
                }
              ]
            }
          ],
          documents : [
            <Documentation> {
              id : 'asdf1113',
              name : 'Documetation1',
              description : "Description",
              parentSlug : 'test1/test2',
              content : '<b>this is a test </b>'
            },
            <Documentation> {
              id : 'asdf1112',
              name : 'Documetation2',
              description : "Description",
              parentSlug : 'test1/test2',
              content : '<b>this is a test </b>'
            }
          ]
        }
      ]
    }
  ]

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

  public captureState (id: string) : void {
    this.collapsdeState[id] = document.querySelector("#n" + id)['checked'];
    console.log(this.collapsdeState);
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
