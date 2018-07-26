import { ProductService } from '../docs/product/product.service';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductResolve implements Resolve<any> {

    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const productId = route.params.productId || '';
        return this.productService.getProduct(productId);
    }
}

@Injectable({
    providedIn: 'root'
})
export class ProductResolveCache implements Resolve<any> {

    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const productId = route.params.productId || '';

        return this.productService.getProduct(productId, true);
    }
}