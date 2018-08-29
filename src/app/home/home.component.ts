import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public forumBlogs: any[] = [];
  public supportForums : any[] = [];
  public supportCid: number;
  public announcementsCid: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      if(data.NodeBBBlogs && data.NodeBBBlogs.blogs && data.NodeBBBlogs.blogs.topics && data.NodeBBBlogs.blogs.topics.length)
        this.forumBlogs = data.NodeBBBlogs.blogs.topics.slice(0,5);
      if(data.NodeBBBlogs && data.NodeBBBlogs.generalSupport && data.NodeBBBlogs.generalSupport.topics && data.NodeBBBlogs.generalSupport.topics.length)
        this.supportForums = data.NodeBBBlogs.generalSupport.topics.slice(0,5);
      if(data.NodeBBBlogs && data.NodeBBBlogs.supportCid)
        this.supportCid = data.NodeBBBlogs.supportCid;
      if(data.NodeBBBlogs && data.NodeBBBlogs.announcementsCid)
        this.announcementsCid = data.NodeBBBlogs.announcementsCid;
    });
  }
}
