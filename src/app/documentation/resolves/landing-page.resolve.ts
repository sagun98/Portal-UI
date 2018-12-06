import { of, Observable } from 'rxjs';

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
        return  new Observable(observer => {
            this.documentationService.$documentationLandingPageArea.subscribe(documentationArea => {
                if(documentationArea.id && documentationArea.id.length)
                    this.documentationService.findDocumentationArea(documentationArea.id).subscribe(fullDocumentationArea => {
                        observer.next(fullDocumentationArea);
                        observer.complete();
                    });
                
                else {
                    observer.next(documentationArea);
                    observer.complete();
                }
            });
        });
    }
}