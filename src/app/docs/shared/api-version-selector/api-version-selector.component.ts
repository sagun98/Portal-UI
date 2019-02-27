import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { API } from '../../api/interfaces/api.interface';
import { APIDetail } from '../../../core/interfaces/api-detail.interface';

@Component({
  selector: 'api-version-selector',
  templateUrl: './api-version-selector.component.html',
  styleUrls: ['./api-version-selector.component.scss']
})
export class ApiVersionSelectorComponent implements OnInit {

  @Input() api: API;
  @Input() createNewVersion: boolean = false;
  @Output() onSelectionChange: EventEmitter<APIDetail> = new EventEmitter<APIDetail>();
  @Output() onNewVersionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public versionChange (detail: APIDetail) : void {
    this.onSelectionChange.next(detail);
  }

  public _onNewVersionClick () {
    this.onNewVersionClick.next();
  }
}
