import { ProductService, ProductListChange } from './../../../docs/product/product.service';
import { DevPortalAPI } from './../../../docs/api/api.model';
import { Product } from './../../../docs/product/product.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProxyService, APIListChange, CRUD } from '../../../docs/api/proxy.service';

@Component({
  selector: 'side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  public apiFilter:string = '';

  @Input() products: Product[] = [];
  @Input() apis: DevPortalAPI[] = [];
  @Input() selectedApiId: string = '';
  @Input() selectedProductId: string = '';

  @Output() onItemSelected: EventEmitter<any>  = new EventEmitter<any>();

  constructor(
    private router : Router,
    private proxyService: ProxyService,
    private productService : ProductService
  ) { }

  ngOnInit() {
    this.proxyService.$onApiListChanged.subscribe( (apiListChange : APIListChange) => {
      // Add to the list
      if(apiListChange.action === CRUD.CREATE){
        this.apis.push(apiListChange.api);
      }

      // Update the list
      if(apiListChange.action === CRUD.UPDATE){
        this.apis = this.apis.map(api => {
          if(api.id === apiListChange.api.id)
            return apiListChange.api;
          return api;
        });
      }

    });

    this.productService.$onProductListChanged.subscribe( (productListChange : ProductListChange) => {

      if(productListChange.action === CRUD.CREATE)
        this.products.push(productListChange.product);

      if(productListChange.action === CRUD.UPDATE)
        this.products = this.products.map( product => {
          if(product.id === productListChange.product.id)
            return productListChange.product;
          return product;
        });

    })
  }

  public get apisFiltered () {
    return this.apis
      .map(api => {
        api.name = api.name.replace(/API.*/, '');
        return api;
      })
      .filter(api => {
        const search = new RegExp(this.apiFilter, 'gi');

        return search.test(api.name);
      });
  }

  public addApi($event){
    $event.preventDefault();
    $event.stopPropagation();

    this.router.navigate([`/docs/api/new`]);
  }

  public addProduct($event){
    $event.preventDefault();
    $event.stopPropagation();

    this.router.navigate([`/docs/product/new`]);
  }

}
