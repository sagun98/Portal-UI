import { Component, OnInit, Input } from '@angular/core';
import { API } from '../../api/interfaces/api.interface';

@Component({
  selector: 'api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.scss']
})
export class ApiCardComponent implements OnInit {

  @Input() api: API;

  constructor() { }

  ngOnInit() {
  }

}
