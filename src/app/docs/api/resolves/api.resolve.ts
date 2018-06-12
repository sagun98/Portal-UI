import { ApiService } from './../api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export class ApiResolve implements Resolve<any> {
    
    constructor(
        private apiService : ApiService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const apiId = route.params.apiId || '';

        return this.apiService.getApi(apiId);
    }
}