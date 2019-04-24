import { Component, OnInit, Input } from '@angular/core';
import { DocumentationArea } from '../../../core/interfaces/documentation-area.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'documentation-area',
  templateUrl: './documentation-area.component.html',
  styleUrls: ['./documentation-area.component.scss']
})
export class DocumentationAreaComponent implements OnInit {

  @Input() documentationAreas: DocumentationArea[];

  constructor() { }

  ngOnInit() {
  }

  public dropDocument(event: CdkDragDrop<string[]>, documentationArea: DocumentationArea) {
    console.log(event);
    moveItemInArray(documentationArea.documents, event.previousIndex, event.currentIndex);
  }

  public dropArea(event: CdkDragDrop<string[]>, documentationAreas: DocumentationArea[]) {
    console.log(event);
    moveItemInArray(documentationAreas, event.previousIndex, event.currentIndex);
  }

}
