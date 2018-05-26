import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';
import { AppService } from "../app.service";

@Injectable()
export class ApisResolve implements Resolve<any> {
    
    constructor(private appService : AppService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.appService.getAPIs();
    }
}