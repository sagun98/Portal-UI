import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';
import { ProxyService } from "../docs/api/proxy.service";

@Injectable()
export class ApisResolve implements Resolve<any> {
    
    constructor(
        private apiService : ProxyService
    ){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.apiService.getApiList();
    }
}