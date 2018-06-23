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

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      console.log("Blogs: ", data.Blogs);
      this.announcementBlogs = data.Blogs || this.announcementBlogs;
    });
  }

  public gotToBlog (blog : BlogPost) {
    console.log("blog: ", blog);
    this.router.navigate([`/blog/post/${blog.id}`]);
  }

}
