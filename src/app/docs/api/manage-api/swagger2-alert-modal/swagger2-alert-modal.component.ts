import { BehaviorSubject } from 'rxjs';
import { Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'swagger2-alert-modal',
  templateUrl: './swagger2-alert-modal.component.html',
  styleUrls: ['./swagger2-alert-modal.component.scss']
})
export class Swagger2AlertModalComponent implements OnInit, OnChanges{
  @Input() opened: boolean = false;
  public onClosed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges (change) {
    if(! change.opened.firstChange && ! change.opened.currentValue) {
      this.onClosed = new BehaviorSubject<boolean>(false);
    }
      
  }

  public ok () {
    this.onClosed.next(true);
  }

}
