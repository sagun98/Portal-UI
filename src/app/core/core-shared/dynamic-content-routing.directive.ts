import { Router } from '@angular/router';
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
      const target = <Element> event.target
      const type = target.tagName.toLowerCase();

      if(type === 'a'){
        let href = target['href'];
        let portalBase = window.location.protocol + '//' + window.location.host;

        if( href.indexOf(portalBase) != -1 || href.indexOf(environment.forumBase) != -1){
          event.preventDefault();
          event.stopPropagation();
          
          href = href.replace(portalBase, '').replace(environment.forumBase, '');
          this.router.navigate([href]);
          return;
        }
        else {
          target['target'] = '_blank';
        }  
      }
    }
  }

}
