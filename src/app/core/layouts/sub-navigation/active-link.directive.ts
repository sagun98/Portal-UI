import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';

@Directive({
  selector: '[activeLink]'
})
export class ActiveLinkDirective implements OnInit {

  @Input()
  public activeLink: string;
  public pattern: RegExp;


  constructor(
    private router : Router,
    public el: ElementRef
  ) {}

  ngOnInit(){
    this.pattern = new RegExp(this.activeLink);

    this.router.events.subscribe(routerEvent => {
      let isNavEnd: boolean = routerEvent instanceof NavigationEnd;
      if( this.router.navigated && isNavEnd) {
       this.setActiveLinkClass(routerEvent);
      }
    });
  }

  private setActiveLinkClass (routerEvent:  any) {
    const event = <NavigationEnd>routerEvent;
    const url: string = event.url;
    const element =  this.el.nativeElement as HTMLElement;
    const matches = this.pattern.test(url)

    if ( matches )
      element.classList.add('active');
    else
      element.classList.remove('active');
  }

}
