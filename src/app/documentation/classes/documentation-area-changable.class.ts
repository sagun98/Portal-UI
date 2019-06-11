import { DocumentationService } from './../documentation.service';
import { ViewChild } from '@angular/core';
import { DocumentationArea } from "../../core/interfaces/documentation-area.interface";
import { DocumentationAreaSelectorComponent } from "../shared/documentation-area-selector/documentation-area-selector.component";
import { VerifyFormSavedComponent } from '../../core/classes/verify-form-saved';
import { EntityComponent } from '../../core/classes/EntityComponent';

export abstract class ChangableDocumentationArea extends VerifyFormSavedComponent {

    public documentationAreas: DocumentationArea[] = [];
    public selectedDocumentationArea: DocumentationArea;
    public parentDocumentationArea: DocumentationArea = null;
    public documentationArea: DocumentationArea;

    @ViewChild(DocumentationAreaSelectorComponent) documentationAreaSelector: DocumentationAreaSelectorComponent;

    protected abstract getDocumentationAreaService () : DocumentationService;

    protected setDocumentationAreaList() {
        this.getDocumentationAreaService().cache.$documentationAreas.subscribe(documentationAreas => {
            documentationAreas = documentationAreas.filter(documentationarea => {return documentationarea.name !== 'Documentation Landing Page'});
            const clone = JSON.parse(JSON.stringify(documentationAreas));
            let flatDocumentationAreas = this.getDocumentationAreaService().getFlatDocumentationAreas(clone);
            this.documentationAreas = flatDocumentationAreas;
        });
    }

    public changeParentDocumentationArea (documentationArea: DocumentationArea, oldDocumentationArea: DocumentationArea) : void {
        if(documentationArea.id !== oldDocumentationArea.id) {
            let doChange:boolean = confirm(`Are you sure you want to change this documents Documentation Area to ${documentationArea.name}?`);

            if(doChange) {
                this.parentDocumentationArea = documentationArea;
                this.documentationArea.parentSlug = this.parentDocumentationArea.slug;
            }
            else {
            setTimeout(t => {
                this.documentationAreaSelector.documentationArea = Object.assign({}, oldDocumentationArea);
                this.documentationAreaSelector.ngOnInit();
            });
            }
        }
    }
}