import { ApiService } from '../docs/api/api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ApisResolve implements Resolve<any> {
    
    constructor( private apiService : ApiService ){ }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.apiService.getApiList();
    }
}