import { DocumentationService } from '../documentation.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({providedIn : 'root'})
export class DocumentResolve implements Resolve<any> {

    constructor (
        private documentationService : DocumentationService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const blogId = route.params.blogId || '';

        return this.documentationService.getBlogPost(blogId);
    }
}