import { Component, OnInit, Input } from '@angular/core';
import { ColumnLink } from './column-link.class';
import { NodeBBBlogsResolve } from '../../../resolves/blogs.resolve';

@Component({
  selector: 'dev-portal-footer',
  templateUrl: './dev-portal-footer.component.html',
  styleUrls: ['./dev-portal-footer.component.scss']
})
export class DevPortalFooterComponent implements OnInit {

  @Input() year: number = new Date().getFullYear();
  @Input() columnLinks: ColumnLink[][] = [[],[]];

  constructor(
    private nodeBBBlogsResolve : NodeBBBlogsResolve
  ) { }

  ngOnInit() {
    if(! this.columnLinks[0].length)
      this.setDefaultColumnLinks();
  }

  private setDefaultColumnLinks () {
    this.setPearsonLinks();
    this.setDevPortalLinks();
  }

  private setPearsonLinks () {
    this.columnLinks[0].push( new ColumnLink('Terms of use', 'https://www.pearson.com/us/terms-of-use.html') );
    this.columnLinks[0].push( new ColumnLink('Privacy Statement', 'https://www.pearson.com/us/privacy-statement.html') );
    this.columnLinks[0].push( new ColumnLink('Patent Notice', 'https://www.pearson.com/us/patent-notice.html') );
    this.columnLinks[0].push( new ColumnLink('Accessibility', 'https://www.pearson.com/us/accessibility.html') );
  }

  private setDevPortalLinks () {
    this.nodeBBBlogsResolve.resolve(null, null).subscribe( (forumData: any) => {
      this.columnLinks[1].push(new ColumnLink('Feedback', '/forum' + forumData.feedback.url));
      this.columnLinks[1].push(new ColumnLink('Support', '/forum' + forumData.generalSupport.url));
      this.columnLinks[1].push(new ColumnLink('Annoucements', '/forum' + forumData.blogs.url));
    });
  }
}
