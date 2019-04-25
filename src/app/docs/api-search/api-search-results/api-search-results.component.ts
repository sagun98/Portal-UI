import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { API } from '../../../core/interfaces/api.interface';

@Component({
  selector: 'api-search-results',
  templateUrl: './api-search-results.component.html',
  styleUrls: ['./api-search-results.component.scss']
})
export class ApiSearchResultsComponent implements OnInit {
  // TODO: Create Search Results Interface
  @Input() apis: any[] = [];
  @Output() apiSelected: EventEmitter<API> = new EventEmitter<API>();

  constructor() { }

  ngOnInit() {

  }

  public emitApiSelected (api: API) {
    this.apiSelected.emit(api);
  }
}
