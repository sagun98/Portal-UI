import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SideNavigationService } from '../core/layouts/side-navigation/side-navigation.service';
import { MenuSlideClose } from '../core/animations/animations';
import { API } from '../core/interfaces/api.interface';
import { Product } from '../core/interfaces/product.interface';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  animations: [MenuSlideClose]
})
export class DocsComponent implements OnInit {

  public apis: API[] = [];
  public products: Product[] = [];
  public selectedApiId: string = '';
  public selectedProductId: string = '';
  public selectedSlug: string = '';
  public routeChange: boolean = true;
  @Input() menuOpened: boolean = true;
  
  @ViewChild('main') mainElementRef: ElementRef;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private sideNavigationService: SideNavigationService
  ){ }

  ngOnInit(){
    this.sideNavigationService.$sideNavOpened.subscribe(opened => {
      this.menuOpened = opened;
    });

    this.apis = this.activatedRoute.snapshot.data.apisData;
    this.products = this.activatedRoute.snapshot.data.productData;
    
    // The the selected API / Product ID if they exist
    if(this.activatedRoute.snapshot.children.length){

      // Watch for changes in the route and update the sideNav
      this.activatedRoute.children[0].params.subscribe( params => {
        this.setParams(params);
        this.scrollTop();
        this.menuOpened = true;
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
          this.menuOpened = true;
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
    this.selectedSlug = params.apiId || params.productId
  }

  private scrollTop () {
    const mainElement: HTMLElement = <HTMLElement> this.mainElementRef.nativeElement;
    mainElement.scrollTop = 0;
  }

}
