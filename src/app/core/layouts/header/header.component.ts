import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dev-portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Pearson Developer Title';

  constructor() { }

  ngOnInit() {
  }

}
