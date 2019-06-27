import { USER_PERMISSIONS } from '../../enums/user-permissions.enum';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CRUD } from '../../enums/crud.enum';
import { Product } from '../../interfaces/product.interface';
import { API } from '../../interfaces/api.interface';
import { ApiService } from '../../services/api-service/api.service';
import { ProductService } from '../../services/product-service/product.service';
import { APIListChange } from '../../interfaces/api-list-change.interface';
import { ProductListChange } from '../../interfaces/product-list-change.interface';


@Component({
  selector: 'side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  public apiFilter:string = '';
  public requestApiModalOpened:boolean = false;

  @Input() products: Product[] = [];
  @Input() apis: API[] = [];
  @Input() selectedApiId: string = '';
  @Input() selectedProductId: string = '';
  @Input() selectedSlug: string = '';
  @Output() onItemSelected: EventEmitter<any>  = new EventEmitter<any>();

  constructor(
    private router : Router,
    private apiService: ApiService,
    private productService : ProductService
  ) { }

  public get permissions () : any {
    return USER_PERMISSIONS;
  }

  ngOnInit() {

    this.apis = this.sortEntities(this.apis);

    this.products = this.sortEntities(this.products);

    this.apiService.$onApiListChanged.subscribe( (apiListChange : APIListChange) => {
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

      // Delete an API
      if(apiListChange.action === CRUD.DELETE){
        this.apis = this.apis.filter(api => {
          return api.id !== apiListChange.api.id
        });
      }

      this.apiService._apis = this.apis;
    });

    this.productService.$onProductListChanged.subscribe( (productListChange : ProductListChange) => {

      // Add new product to the list without HTTP request
      if(productListChange.action === CRUD.CREATE)
        this.products.push(productListChange.product);

      // Update product in the list without HTTP request
      if(productListChange.action === CRUD.UPDATE)
        this.products = this.products.map( product => {
          if(product.id === productListChange.product.id)
            return productListChange.product;
          return product;
        });

      // Delete an API
      if(productListChange.action === CRUD.DELETE){
        this.products = this.products.filter(product => {
          return product.id !== productListChange.product.id
        });
      }
    })
  }

  private sortEntities (entity) : any {
    entity = entity.sort( (a1 : API, a2 : API) => {
      if(a1.name.toLowerCase() > a2.name.toLowerCase())
        return 1;
      if(a1.name.toLowerCase() < a2.name.toLowerCase())
        return -1;
      return 0;
    });

    return entity;
  }

  public requestAPI() {
    this.requestApiModalOpened = true;
  }

  public requestApiModalClosed (closed) {
    this.requestApiModalOpened = closed;
  }

  public get apisFiltered () {
    return this.apis
      .map(api => {
        api.name = api.name.replace(/(.*)API$/gi, '$1');
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

    this.router.navigate([`/docs/apicollections/new`]);
  }

}
