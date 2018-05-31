import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'query-params',
  templateUrl: './query-params.component.html',
  styleUrls: ['./query-params.component.css']
})
export class QueryParamsComponent implements OnInit {
  @Input() params: any[] = [];
  @Input() edit: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
