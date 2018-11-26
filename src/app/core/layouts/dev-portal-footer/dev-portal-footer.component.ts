import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ColumnLink } from './column-link.class';
import { NodeBBBlogsResolve } from '../../../resolves/blogs.resolve';

@Component({
  selector: 'dev-portal-footer',
  templateUrl: './dev-portal-footer.component.html',
  styleUrls: ['./dev-portal-footer.component.scss']
})
export class DevPortalFooterComponent implements OnInit {

  @HostBinding('style.display') display: string;

  @Input() year: number = new Date().getFullYear();
  @Input() columnLinks: ColumnLink[][] = [[],[]];
  @Input() editUrls: RegExp[] = [
    new RegExp('/docs/api/new'),
    new RegExp('/docs/api/.*/edit'),
    new RegExp('/docs/product/new'),
    new RegExp('/docs/product/.*/edit'),
    new RegExp('/documentation/new'),
    new RegExp('/documentation/area/mew'),
    new RegExp('/documentation/area/.*/edit'),
    new RegExp('/documentation/.*/edit')
  ];

  constructor(
    private nodeBBBlogsResolve : NodeBBBlogsResolve,
    private router: Router
  ) { }

  ngOnInit() {
    if(! this.columnLinks[0].length)
      this.setDefaultColumnLinks();

    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        let hideFooter: boolean = false;
        this.editUrls.forEach( (pattern: RegExp) => {
          const matches: boolean = pattern.test(window.location.pathname);

          if(matches)
            hideFooter = true;
        });

        this.display = (hideFooter) ? 'none' : '';
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
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
      this.columnLinks[1].push(new ColumnLink('Feedback', '/forum/category/' + forumData.feedback.cid));
      this.columnLinks[1].push(new ColumnLink('Support', '/forum/category/' + forumData.generalSupport.cid));
      this.columnLinks[1].push(new ColumnLink('Announcements', '/forum/category/' + forumData.blogs.cid));
    });
  }
}
