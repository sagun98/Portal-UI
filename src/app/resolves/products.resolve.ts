import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { ProductService } from "../core/services/product-service/product.service";

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

@Injectable({
    providedIn: 'root'
})
export class ProductsResolveCached implements Resolve<any> {
    
    constructor(
        private productService : ProductService
    ){  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.productService.getProducts(true);
    }
}