import { ProductService } from './../docs/product/product.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductsResolve implements Resolve<any> {
    
    constructor(
        private productService : ProductService
    ){  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.productService.getProducts();
    }
}