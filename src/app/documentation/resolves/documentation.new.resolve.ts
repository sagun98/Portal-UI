import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { DocumentationService } from "../documentation.service";

@Injectable({providedIn : 'root'})
export class DocumentationNewResolve implements Resolve<any> {

    constructor (
        private documentationService : DocumentationService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let documentationAreaId = route.params.id;
        let documentationId = route.params.slug;

        return this.documentationService.findDocumentationById(documentationAreaId, documentationId);
    }
}