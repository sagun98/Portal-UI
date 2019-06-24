import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { ProductListChange } from '../../interfaces/product-list-change.interface';
import { Product } from '../../interfaces/product.interface';
import { environment } from '../../../../environments/environment';
import { CRUD } from '../../enums/crud.enum';
import { Privilege } from '../../interfaces/permissible.interface';
import { UserPrivilegeClass } from '../../classes/user-privilege';

interface CachedProducts {
  product?: boolean,
  products?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public $onProductListChanged: Subject<ProductListChange> = new Subject<ProductListChange>();
  public _products_cache_: Product[] = [];
  public _product_cache_: Product;
  public provideCachedVersion:CachedProducts = {
    product : false,
    products : false
  }

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(getCache? : boolean) {
    if(getCache)
      return of(this._products_cache_);
      
    return this.http.get(`${environment.restBase}/products`).pipe(
      tap( (products : Product[]) =>  {
        this._products_cache_ = products;
      })
    );
  }

  public addProduct( product : Product ) {
    return this.http.post(`${environment.restBase}/products`, product).pipe(tap( (newProduct : Product) => {
      this._product_cache_ = newProduct;

      this.$onProductListChanged.next( <ProductListChange>{
        action : CRUD.CREATE,
        product : newProduct
      });
    }));
  }

  public deleteProduct ( product : Product ) {
    return this.http.delete(`${environment.restBase}/products/${product.id}`).pipe(      
      tap(_product => {
        this._products_cache_ = this._products_cache_.filter(_product => { return _product.id !== product.id });

        this.$onProductListChanged.next( <ProductListChange>{
          action : CRUD.DELETE,
          product : product
        });
      })
    )
  }

  public getPrivileges (id) {
    return this.http.get(`${environment.restBase}/products/${id}/privileges`).pipe(
      map( (privileges : Privilege[]) => {
        return privileges.map(p => { return  new UserPrivilegeClass(p); })
      })
    );
  }

  public getAPIPrivileges (id) : Observable<UserPrivilegeClass[]> {
    return <Observable<UserPrivilegeClass[]>> this.http.get(`${environment.restBase}/products/${id}/apiPrivileges`).pipe(
      map( (privileges : Privilege[]) => {
        return privileges.map(p => { return  new UserPrivilegeClass(p); })
      })
    );
  }

  public updateProduct ( product : Product ) {
    return this.http.put(`${environment.restBase}/products/${product.id}`, product).pipe(tap( (updatedProduct : Product) => {
      this._product_cache_ = updatedProduct;

      this.$onProductListChanged.next( <ProductListChange>{
        action : CRUD.UPDATE,
        product : updatedProduct
      });
    }));
  }

  public updateFineGrainedPrivileges (id: string, privileges : UserPrivilegeClass[]) {
    return this.http.put(`${environment.restBase}/products/${id}/privileges`, privileges);
  }

  public updateAPIUserPrivileges (id: string, privileges : UserPrivilegeClass[]) : Observable<Product> {
    return  <Observable<Product>> this.http.put(`${environment.restBase}/products/${id}/apiPrivileges`, privileges);
  }

  public getProduct ( productId : string, getCache? : boolean ) {
    // if(getCache || this.provideCachedVersion.product){
    //   this.provideCachedVersion.product = false;
    //   return of(this._product_cache_);
    // }

    return this.http.get(`${environment.restBase}/products/${productId}`).pipe(
      tap( (product : Product) =>  {
        this._product_cache_ = product;
      })
    );
  }

  public follow (id: string, cid: number) : Observable<Product> {
    return <Observable<Product>> this.http.post(`${environment.restBase}/products/${id}/category/${cid}/follow`, null);
  }

  public unfollow (id: string, cid: number) : Observable<Product> {
    return <Observable<Product>> this.http.delete(`${environment.restBase}/products/${id}/category/${cid}/follow`);
  }
}
