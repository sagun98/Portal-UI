import { BlogService } from './../../blog.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class DocumentationLandingPageResolve implements Resolve<any> {
    
    constructor (
        private blogService : BlogService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.blogService.getDocumentationLandingPage();
    }
}