import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { API } from '../interfaces/api.interface';

@Component({
  selector: 'api',
  templateUrl: './view-api.component.html',
  styleUrls: ['./view-api.component.scss']
})
export class ViewApiComponent implements OnInit {

  @Input() api: API = null;

  constructor(
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.api = data.api || this.api;
    });
  }

  // shorthand to get yaml -> json
  public get swaggerJson () {
    return this.api.swagger;
  }

  // shorthand to get overview
  public get overviewSafe (){
    return this.domSanitizer.bypassSecurityTrustHtml( this.api.overview );
  }

  // shorthand to get gettingStarted safe
  public get gettingStartedSafe (){
    return this.domSanitizer.bypassSecurityTrustHtml( this.api.gettingStarted );
  }

  // shorthand to get reference safe
  public get referenceSafe (){
    return this.domSanitizer.bypassSecurityTrustHtml( this.api.reference );
  }

}
