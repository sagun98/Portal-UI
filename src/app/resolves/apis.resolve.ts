import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';
import { ApiService } from "../core/services/api-service/api.service";

@Injectable({providedIn: 'root'})
export class ApisResolve implements Resolve<any> {
    
    constructor( private apiService : ApiService ){ }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.apiService.getApiList();
    }
}