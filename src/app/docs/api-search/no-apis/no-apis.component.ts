import { Component, OnInit, Input } from '@angular/core';
import { API } from '../../api/interfaces/api.interface';

@Component({
  selector: 'no-apis',
  templateUrl: './no-apis.component.html',
  styleUrls: ['./no-apis.component.scss']
})
export class NoApisComponent implements OnInit {
  @Input() apis: API[];
  
  constructor() { }

  ngOnInit() {
  }

}
