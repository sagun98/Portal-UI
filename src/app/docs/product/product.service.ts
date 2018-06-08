import { CRUD } from './../api/proxy.service';
import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs';

// TODO: Move this into a separate file
export interface ProductListChange {
  action : CRUD,
  product : Product
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public $onProductListChanged: Subject<ProductListChange> = new Subject<ProductListChange>();

  constructor(
    private http: HttpClient
  ) { }

  public getProducts() {
    return this.http.get('http://localhost:8080/products');
  }

  public addProduct( product : Product ) {
    return this.http.post(`http://localhost:8080/products`, product).pipe(tap( (newProduct : Product) => {
      this.$onProductListChanged.next({
        action : CRUD.CREATE,
        product : newProduct
      });
    }));
  }

  public updateProduct ( product : Product ) {
    return this.http.put(`http://localhost:8080/products/${product.id}`, product).pipe(tap( (updatedProduct : Product) => {
      this.$onProductListChanged.next({
        action : CRUD.UPDATE,
        product : updatedProduct
      });
    }));
  }

  public getProduct ( productId : string ) {
    return this.http.get(`http://localhost:8080/products/${productId}`);
  }
}
