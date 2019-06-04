import { UserService } from './../../../core/services/user/user.service';
import { DocumentationService } from './../../documentation.service';
import { ActivatedRoute } from '@angular/router';
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
  @Input() currentId: string;

  @Output() documentationAreaClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() addDocumentClick: EventEmitter<string> = new EventEmitter<string>();
  public depth: number = 0;

  constructor(
    private activatedRoute : ActivatedRoute,
    private documentationService: DocumentationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.depth = (this.documentationAreas && this.documentationAreas.length) ? this.getDepth(this.documentationAreas[0]) : this.depth;

    this.documentationAreas.sort(this.sortDocumentationAreas);

    this.documentationAreas.forEach(documentationArea => {
      documentationArea.documents.sort(this.sortDocumentationAreas)
    })
  }

  public updateState(documentationArea: DocumentationArea) {
    setTimeout(t=> {this.state[documentationArea.id] = !this.state[documentationArea.id];}, 0);
  }

  public getDepth (documentationArea: DocumentationArea) : number{
    return documentationArea.slug.split("/").length;
  }

  public dropDocument(event: CdkDragDrop<string[]>, documentationArea: DocumentationArea) : DocumentationArea {
    if(! this.userService.isAdmin() && ! this.userService.hasRole('DOCUMENTATION_CONTRIBUTOR'))
      return null;

    moveItemInArray(documentationArea.documents, event.previousIndex, event.currentIndex);

    documentationArea.documents.map((documentation, index) => {
      documentation.position = index;
      return documentation;
    });

    this.documentationService.updateDocumentationPosition(documentationArea.documents[event.currentIndex].id, event.currentIndex).subscribe(
      response => {},
      errorResponse => {}
    )

    return documentationArea;
  }

  public dropArea(event: CdkDragDrop<string[]>, documentationAreas: DocumentationArea[]) : DocumentationArea[] {
    if(! this.userService.isAdmin() && ! this.userService.hasRole('DOCUMENTATION_CONTRIBUTOR'))
      return null;

    moveItemInArray(documentationAreas, event.previousIndex, event.currentIndex);

    documentationAreas.map((documentationArea, index) => {
      documentationArea.position = index;
      return documentationArea;
    });

    this.documentationService.updateDocumentationAreaPosition(documentationAreas[event.currentIndex].id, event.currentIndex).subscribe(
      response => {},
      errorResponse => {}
    );

    return documentationAreas;
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

  private sortDocumentationAreas (da1: DocumentationArea, da2: DocumentationArea) : number {
    let p1 = da1.position;
      let p2 = da2.position;

      if(p1 < p2)
        return -1;
      else if(p2 < p1)
        return 1;

      return 0;
  }
}
