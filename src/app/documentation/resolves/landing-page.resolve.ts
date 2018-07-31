import { DocumentationService } from '../documentation.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class DocumentationLandingPageResolve implements Resolve<any> {
    
    constructor (
        private documentationService : DocumentationService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.documentationService.getDocumentationLandingPage();
    }
}