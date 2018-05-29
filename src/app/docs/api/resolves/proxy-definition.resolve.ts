import { ProxyService } from './../proxy.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export class ProxyDefinitionReolsve implements Resolve<any> {
    
    constructor(
        private proxyService : ProxyService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const proxyId = route.params.apiId || '';

        return this.proxyService.getProxyDefinition(proxyId);
    }

    
}