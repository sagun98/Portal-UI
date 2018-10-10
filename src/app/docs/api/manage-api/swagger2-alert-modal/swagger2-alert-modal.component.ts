import { BehaviorSubject } from 'rxjs';
import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'swagger2-alert-modal',
  templateUrl: './swagger2-alert-modal.component.html',
  styleUrls: ['./swagger2-alert-modal.component.scss']
})
export class Swagger2AlertModalComponent implements OnInit {
  @Input() opened: boolean = false;
  public onClosed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

  public ok () {
    this.onClosed.next(true);
  }

}
