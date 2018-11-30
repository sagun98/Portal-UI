import { of } from 'rxjs';

import { DocumentationService } from '../documentation.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { DocumentationArea } from '../../core/interfaces/documentation-area.interface';

@Injectable({providedIn : 'root'})
export class DocumentationLandingPageResolve implements Resolve<any> {
    
    constructor (
        private documentationService : DocumentationService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.documentationService.documentationLandingPageArea && this.documentationService.documentationLandingPageArea.version >= 0)
            return this.documentationService.findDocumentationArea(this.documentationService.documentationLandingPageArea.id);

        else{
            const emptyDocumentationArea = <DocumentationArea> {
                description : '',
                id : '',
                documents : [],
                name : '',
                slug : ''
            };

            this.documentationService.documentationLandingPageArea = emptyDocumentationArea;

            return of(this.documentationService.documentationLandingPageArea);
        }
    }
}