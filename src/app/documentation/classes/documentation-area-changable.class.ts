import { DocumentationService } from './../documentation.service';
import { ViewChild } from '@angular/core';
import { DocumentationArea } from "../../core/interfaces/documentation-area.interface";
import { DocumentationAreaSelectorComponent } from "../shared/documentation-area-selector/documentation-area-selector.component";
import { VerifyFormSavedComponent } from '../../core/classes/verify-form-saved';

export abstract class ChangableDocumentationArea extends VerifyFormSavedComponent {

    public documentationAreas: DocumentationArea[] = [];
    public selectedDocumentationArea: DocumentationArea;
    @ViewChild(DocumentationAreaSelectorComponent) documentationAreaSelector: DocumentationAreaSelectorComponent;

    protected abstract getDocumentationAreaService () : DocumentationService;

    ngOnInit() {
        this.getDocumentationAreaService().cache.$documentationAreas.subscribe(documentationAreas => {
            documentationAreas = documentationAreas.filter(documentationarea => {return documentationarea.name !== 'Documentation Landing Page'});
            this.documentationAreas = documentationAreas;
        });
    }

    protected changeParentDocumentationArea (documentationArea: DocumentationArea, oldDocumentationArea: DocumentationArea) : void {
        console.log("New Documentation Area ID: ", documentationArea.id);
        console.log("Documentation Area ID: ", oldDocumentationArea.id);

        if(documentationArea.id !== oldDocumentationArea.id) {
            let doChange:boolean = confirm(`Are you sure you want to change this documents Documentation Area to ${documentationArea.name}?`);

            if(doChange) {
            console.log("DO IT!!");
            }
            else {
            setTimeout(t => {
                this.documentationAreaSelector.documentationArea = Object.assign({}, oldDocumentationArea);
                this.documentationAreaSelector.ngOnChanges();
            });
            }
        }
    }
}