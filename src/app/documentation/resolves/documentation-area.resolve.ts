import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { DocumentationService } from "../documentation.service";

@Injectable({providedIn : 'root'})
export class DocumentationAreaResolve implements Resolve<any> {

    constructor (
        private documentationService : DocumentationService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const documentationId = route.params.id || '';
        const type = route.data;

        return this.documentationService.findDocumentationArea(documentationId);
    }
}