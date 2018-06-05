import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { AppService } from "../app.service";

@Injectable({
    providedIn: 'root'
})
export class ProductsResolve implements Resolve<any> {
    
    constructor(private appService : AppService){  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.appService.getProducts();
    }
}