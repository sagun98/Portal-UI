import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DocumentationArea, DefaultDocumentationArea } from '../../../core/interfaces/documentation-area.interface';

@Component({
  selector: 'documentation-area-selector',
  templateUrl: './documentation-area-selector.component.html',
  styleUrls: ['./documentation-area-selector.component.scss']
})
export class DocumentationAreaSelectorComponent implements OnInit, OnChanges {
  @Input() documentationAreas: DocumentationArea[]  = [];
  @Input() documentationArea: DocumentationArea = null;
  @Input() documentationAreaId: string;
  @Input() slug: string;
  @Input() allowNoParent: boolean = false;
  @Output() onSelection: EventEmitter<DocumentationArea> = new EventEmitter<DocumentationArea>();
  
  public noSelectionDocumentationArea : DocumentationArea = Object.assign({}, DefaultDocumentationArea, {name : 'No Parent (Root Node)', id : 'root'});
  public selectedDocumentationArea: DocumentationArea = null
  
  constructor() { }

  ngOnInit() {
    // set selected value (or not)
    if (this.documentationArea && this.documentationArea.id) 
      this.selectedDocumentationArea = this.documentationAreas.filter(_documentationArea => {return _documentationArea.id === this.documentationArea.id})[0];
    else
      this.selectedDocumentationArea = this.noSelectionDocumentationArea;

    // Set root option on or not
    if (this.allowNoParent)
      this.documentationAreas.unshift(this.noSelectionDocumentationArea);
    
    this.documentationAreas = this.documentationAreas.filter(da => {
      // If any part of the slug has a fragment of the slug of the DA being managed, remove it (its a child)
      if( (da.slug && this.slug.length && (da.slug.indexOf(this.slug) >= 0)) || (this.documentationAreaId &&  da.id == this.documentationAreaId)) 
        return false
      else
        return true;
    });
  }

  ngOnChanges (changes) {
    // if(this.documentationArea && this.documentationArea.id)
    //   this.selectedDocumentationArea = this.documentationAreas.filter(_documentationArea => {return _documentationArea.id === this.documentationArea.id})[0];
    if(! changes[Object.keys(changes)[0]].firstChange)
      this.ngOnInit();
  }

  public handleChange() : void {
    this.documentationArea = this.selectedDocumentationArea;
    this.onSelection.next(this.selectedDocumentationArea);
  }

}
