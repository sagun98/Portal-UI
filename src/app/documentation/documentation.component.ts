import { DocumentationService } from './documentation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BlogPost } from './interfaces/blog-post.interface';
import { DocumentationArea } from '../core/interfaces/documentation-area.interface';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit { 

  @Input() landingPage: BlogPost;
  @Input() documentationBlogs: BlogPost[];
  @Input() documentationAreas: DocumentationArea[];

  @ViewChild('main') mainElementRef: ElementRef;
  public currentId: string;
  public currentSlug: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private documentationService : DocumentationService,
    private router: Router
  ) { } 

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.documentationBlogs = data.Blogs || this.documentationBlogs;
      this.documentationAreas = data.DocumentationAreas || this.documentationAreas;
    });

    this.router.events.subscribe((event: NavigationEnd) => {
      if (this.router['lastSuccessfulId'] === this.router['navigationId']) {
        if (this.activatedRoute.snapshot.children.length) {
          this.scrollTop();
        }
      }
    });

    this.documentationService.onChange.subscribe(evt => {
      this.documentationService.findAllDocumentationArea().subscribe(documentationAreas => {
        this.documentationAreas = documentationAreas;
      });
    });
  }

  public goToBlog(blog: BlogPost) {
    this.router.navigate([`/documentation/${blog.slug}`]).then(navigated => {
      if (navigated){
        this.currentId = blog.id;
        this.currentSlug = blog.slug;
      }
    });
  }

  private scrollTop() {
    const mainElement: HTMLElement = <HTMLElement>this.mainElementRef.nativeElement;
    // mainElement.scrollTop = 0;
  }

}
