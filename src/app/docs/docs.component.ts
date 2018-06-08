import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  public apis: any[] = [];
  public products: any[] = [];
  public selectedApiId: string = '';
  public selectedProductId: string = '';

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
      });

      this.setParams(this.activatedRoute.snapshot.children[0].params);
    }

    this.router.events.subscribe( (event:NavigationEnd) => {
      if( this.router['lastSuccessfulId'] === this.router['navigationId'] ){
        if( this.activatedRoute.snapshot.children.length ){
          this.setParams(this.activatedRoute.snapshot.children[0].params);
        }
      }
    });
  }

  private setParams(params){
    this.selectedApiId = params.apiId;
    this.selectedProductId = params.productId;
  }

}
