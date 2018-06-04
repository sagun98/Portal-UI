import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
      if( this.router.navigated ) {
        const event = <NavigationEnd>routerEvent;
        const url: string = event.url;
        const element =  this.el.nativeElement as HTMLElement;
        const matches = this.pattern.test(url)

        if ( matches )
          element.classList.add('active');
        else
          element.classList.remove('active');
      }
    });
  }

}
