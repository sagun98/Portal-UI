
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs';
import { ProductListChange } from './interfaces/product-list-change.interface';
import { CRUD } from '../../core/enums/crud.enum';
import { Product } from './interfaces/product.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public $onProductListChanged: Subject<ProductListChange> = new Subject<ProductListChange>();

  constructor(
    private http: HttpClient
  ) { }

  public getProducts() {
    return this.http.get(`${environment.restBase}/products`);
  }

  public addProduct( product : Product ) {
    return this.http.post(`${environment.restBase}/products`, product).pipe(tap( (newProduct : Product) => {
      this.$onProductListChanged.next( <ProductListChange>{
        action : CRUD.CREATE,
        product : newProduct
      });
    }));
  }

  public updateProduct ( product : Product ) {
    return this.http.put(`${environment.restBase}/products/${product.id}`, product).pipe(tap( (updatedProduct : Product) => {
      this.$onProductListChanged.next( <ProductListChange>{
        action : CRUD.UPDATE,
        product : updatedProduct
      });
    }));
  }

  public getProduct ( productId : string ) {
    return this.http.get(`${environment.restBase}/products/${productId}`);
  }
}
