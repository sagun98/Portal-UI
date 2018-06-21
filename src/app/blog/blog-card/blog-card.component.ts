import { BlogPost } from './../interfaces/blog-post.interface';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input() blog: BlogPost;
  @Output() onClick: EventEmitter<BlogPost> = new EventEmitter<BlogPost>();

  @ViewChild("text", {read: ElementRef}) textDiv: ElementRef;
  public showEllipsis: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(t => {
      const el = <HTMLElement>this.textDiv.nativeElement;
      const height = el.offsetHeight;

      this.showEllipsis = (height >= 100);
    }, 100);
  }

  public emitEvent() {
    this.onClick.emit(this.blog);
  }

}
