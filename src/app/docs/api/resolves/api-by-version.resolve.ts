import { tap } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api-service/api.service';

export class ApiByVersionResolve implements Resolve<any> {
    
    constructor(
        private apiService : ApiService,
        private router: Router,
        private toastrService: ToastrService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const apiId = route.params.apiId || '';
        const version = route.params.version;

        return this.apiService.getApiByVersion(apiId, version).pipe(
            tap(result => {
                if(! result){
                    this.router.navigate([`/docs/api/search`]);
                    this.toastrService.error('This API cannot be found.');
                }
            },error => {
                this.router.navigate([`/docs/api/search`]);
            })
        );
    }
}