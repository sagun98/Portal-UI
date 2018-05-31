import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'path-params',
  templateUrl: './path-params.component.html',
  styleUrls: ['./path-params.component.css']
})
export class PathParamsComponent implements OnInit {
  @Input() params: any[] = [];
  @Input() edit: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
