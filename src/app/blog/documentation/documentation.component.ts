import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogPost } from './../interfaces/blog-post.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  @Input() landingPage: BlogPost;
  @Input() documentationBlogs: BlogPost[];
  @ViewChild('main') mainElementRef: ElementRef;
  public currentId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.documentationBlogs = data.Blogs || this.documentationBlogs;
    });

    this.router.events.subscribe((event: NavigationEnd) => {
      if (this.router['lastSuccessfulId'] === this.router['navigationId']) {
        if (this.activatedRoute.snapshot.children.length) {
          this.scrollTop();
        }
      }
    });
  }

  public goToBlog(blog: BlogPost) {
    this.router.navigate([`/blog/documentation/${blog.id}`]).then(navigated => {
      if (navigated)
        this.currentId = blog.id
    });
  }

  private scrollTop() {
    const mainElement: HTMLElement = <HTMLElement>this.mainElementRef.nativeElement;
    mainElement.scrollTop = 0;
  }
}
