import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'body-params',
  templateUrl: './body-params.component.html',
  styleUrls: ['./body-params.component.scss']
})
export class BodyParamsComponent implements OnInit {

  @Input() path: any = {};
  @Input() edit: boolean = false;

  public id: string = '';

  constructor() { }

  ngOnInit() {
    this.id = (this.path.path + this.path.verb).replace(/\//gi, '');
  }
}
