import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentationArea } from '../../../core/interfaces/documentation-area.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'documentation-area',
  templateUrl: './documentation-area.component.html',
  styleUrls: ['./documentation-area.component.scss']
})
export class DocumentationAreaComponent implements OnInit {

  @Input() documentationAreas: DocumentationArea[];
  @Input() defaultAllowedDepth: number = 2;
  @Input() state: any = {test : false};

  @Output() documentationAreaClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() addDocumentClick: EventEmitter<string> = new EventEmitter<string>();
  public depth: number = 0;

  constructor() { }

  ngOnInit() {
    this.depth = (this.documentationAreas && this.documentationAreas.length) ? this.getDepth(this.documentationAreas[0]) : this.depth;
  }

  public updateState(documentationArea: DocumentationArea) {
    setTimeout(t=> {this.state[documentationArea.id] = !this.state[documentationArea.id];}, 0);
  }

  public getDepth (documentationArea: DocumentationArea) : number{
    return documentationArea.slug.split("/").length;
  }

  public dropDocument(event: CdkDragDrop<string[]>, documentationArea: DocumentationArea) {
    moveItemInArray(documentationArea.documents, event.previousIndex, event.currentIndex);
  }

  public dropArea(event: CdkDragDrop<string[]>, documentationAreas: DocumentationArea[]) {
    moveItemInArray(documentationAreas, event.previousIndex, event.currentIndex);
  }

  public emitDoubleClick(id: string) {
    this.documentationAreaClick.emit(id);
  }

  public emitAddDocument(id: string, event) {
    if(event){
      event.preventDefault();
      event.stopPropagation();
    }
    this.addDocumentClick.emit(id);
  }
}
