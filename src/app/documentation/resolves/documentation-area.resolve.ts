import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { DocumentationService } from "../documentation.service";

@Injectable({providedIn : 'root'})
export class DocumentationAreaResolve implements Resolve<any> {

    constructor (
        private documentationService : DocumentationService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const values =  Object.values(route.params);
        const slug = values.slice(0, values.length - 1).join('/');
        const id = route.params.id;

        if(slug.length)
            return this.documentationService.findDocumentationAreaBySlug(slug);

        else if(id.length)
            return this.documentationService.findDocumentationArea(id);
    }
}