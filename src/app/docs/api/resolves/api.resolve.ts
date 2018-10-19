import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

export class ApiResolve implements Resolve<any> {
    
    constructor(
        private apiService : ApiService,
        private router: Router,
        private toastrService: ToastrService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const apiId = route.params.apiId || '';

        return this.apiService.getApi(apiId).pipe(
            tap(result => {
                if(! result){
                    this.router.navigate([`/docs/api/search`]);
                    this.toastrService.error('This API cannot be found.');
                }
            })
        );
    }
}