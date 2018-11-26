import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { DocumentationService } from "../documentation.service";

@Injectable({providedIn : 'root'})
export class DocumentationAreasResolve implements Resolve<any> {

    constructor (
        private documentationService : DocumentationService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const blogId = route.params.blogId || '';
        const type = route.data;

        return this.documentationService.findAllDocumentationArea();
    }
}