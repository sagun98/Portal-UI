import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { DocumentationService } from "../documentation.service";

@Injectable({providedIn : 'root'})
export class DocumentationNewResolve implements Resolve<any> {

    constructor (
        private documentationService : DocumentationService,
        private router: Router,
        private toastrService: ToastrService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let documentationAreaId = route.params.id;
        let documentationId = route.params.slug;

        return this.documentationService.findDocumentationById(documentationAreaId, documentationId).pipe(
            tap(result => {
                if(! result){
                    this.router.navigate([`/documentation/main`]);
                    this.toastrService.error('This Document cannot be found.');
                }
            })
        );
    }
}