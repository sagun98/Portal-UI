import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from './product/interfaces/product.interface';
import { API } from './api/interfaces/api.interface';
// import { FadeInOutRuterAnimation } from '../core/animations/animations';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  // animations: [FadeInOutRuterAnimation]
})
export class DocsComponent implements OnInit {

  public apis: API[] = [];
  public products: Product[] = [];
  public selectedApiId: string = '';
  public selectedProductId: string = '';
  public routeChange: boolean = true;
  @ViewChild('main') mainElementRef: ElementRef;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit(){
    this.apis = this.activatedRoute.snapshot.data.apisData;
    this.products = this.activatedRoute.snapshot.data.productData;
    
    // The the selected API / Product ID if they exist
    if(this.activatedRoute.snapshot.children.length){

      // Watch for changes in the route and update the sideNav
      this.activatedRoute.children[0].params.subscribe( params => {
        this.setParams(params);
        this.scrollTop();
      });

      this.setParams(this.activatedRoute.snapshot.children[0].params);
    }

    this.router.events.subscribe( (event:NavigationEnd) => {
      if( this.router['lastSuccessfulId'] === this.router['navigationId'] ){
        // this.routeChange = false;
        // setTimeout(t => {this.routeChange = true;}, 500);
        if( this.activatedRoute.snapshot.children.length ){
          this.setParams(this.activatedRoute.snapshot.children[0].params);
          this.scrollTop();
        }
      }
    });
  }

  public getState(outlet) {
    return outlet.activatedRouteData.api;
  }

  private setParams(params){
    this.selectedApiId = params.apiId;
    this.selectedProductId = params.productId;
  }

  private scrollTop () {
    const mainElement: HTMLElement = <HTMLElement> this.mainElementRef.nativeElement;
    mainElement.scrollTop = 0;
  }

}
