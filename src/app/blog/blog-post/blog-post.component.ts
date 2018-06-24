import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from './../interfaces/blog-post.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  @Input() announcementBlogs : BlogPost[];
  public currentId: string;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      console.log("params: ", params);
    });

    this.activatedRoute.data.subscribe(data => {
      this.announcementBlogs = data.Blogs || this.announcementBlogs;
    });
  }

  public gotToBlog (blog : BlogPost) {
    this.router.navigate([`/blog/post/${blog.id}`]).then(navigated => {
      this.currentId = blog.id
    })
  }

}
