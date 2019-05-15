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
  @Output() onSelection: EventEmitter<DocumentationArea> = new EventEmitter<DocumentationArea>();
  
  public noSelectionDocumentationArea : DocumentationArea = Object.assign({}, DefaultDocumentationArea, {name : 'Select Documentation Area'});
  public selectedDocumentationArea: DocumentationArea = null
  
  constructor() { }

  ngOnInit() {
    if (this.documentationArea && this.documentationArea.id) 
      this.selectedDocumentationArea = this.documentationAreas.filter(_documentationArea => {return _documentationArea.id === this.documentationArea.id})[0];
    else
      this.selectedDocumentationArea = this.noSelectionDocumentationArea;
  }

  ngOnChanges () {
    if(this.documentationArea)
      this.selectedDocumentationArea = this.documentationAreas.filter(_documentationArea => {return _documentationArea.id === this.documentationArea.id})[0];
  }

  public handleChange() : void {
    this.documentationArea = this.selectedDocumentationArea;
    this.onSelection.next(this.selectedDocumentationArea);
  }

}
