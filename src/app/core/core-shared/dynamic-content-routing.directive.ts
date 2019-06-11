import { Router, NavigationExtras } from '@angular/router';
import { Directive, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  selector: '[dynamicContentRouting]'
})
export class DynamicContentRoutingDirective {

  @Input() dynamicContentRouting: any;

  constructor(
    private element: ElementRef,
    private router: Router
  ) { }

  public ngOnInit() {
    this.element.nativeElement['onclick'] = (event:Event) => {
      const target = <Element> event.target;
      const parentTarget = <Element> target.parentElement;
      const type = target.tagName.toLowerCase();
      const parentType = parentTarget.tagName.toLocaleLowerCase();

      if(type === 'a' || parentType === 'a'){
        let href = target['href'];
        let portalBase = window.location.protocol + '//' + window.location.host;

        if( href.indexOf(portalBase) != -1 || href.indexOf(environment.forumBase) != -1){
          href = href.replace(portalBase, '').replace(environment.forumBase, '');


          let navigationExtras: NavigationExtras = {
            fragment: (/\#/.test(href)) ? href.replace(/.*\#(.+)/, '$1') : ''
          };
          
          href = href.replace(/(.*)(\#.+)/, "$1");
          this.router.navigate([href], navigationExtras);
          event.preventDefault();
          event.stopPropagation();
          
          return;
        }
        else {
          target['target'] = '_blank';
        }  
      }
    }
  }
}
