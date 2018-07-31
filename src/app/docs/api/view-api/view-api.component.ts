import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { API } from '../interfaces/api.interface';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from '../../../../assets/javascript/swagger-ui-dist';

export const swaggerUIBundle = SwaggerUIBundle;
export const swaggerUIStandalonePreset = SwaggerUIStandalonePreset;

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

      this.setSwaggerUI();
    });
  }

  private setSwaggerUI () {
    const ui = swaggerUIBundle({
      spec : this.swaggerJson,
      domNode: document.querySelector('#swagger-ui'),
      deepLinking: false,
      filter : false,
      // displayOperationId : true,
      presets: [
          swaggerUIBundle.presets.apis,
          swaggerUIStandalonePreset
      ],
      plugins: [
          swaggerUIBundle.plugins.DownloadUrl
      ],
      layout: 'StandaloneLayout'
    });
  }

  // shorthand to get yaml -> json
  public get swaggerJson () {

    // Make sure operation ids are unique so only one opens at a time
    Object.keys( this.api.swagger['paths'] ).forEach(path => {
      const swaggerPath = this.api.swagger['paths'][path];
      Object.keys( swaggerPath ).forEach(method => {
        this.api.swagger['paths'][path][method].operationId = path.concat(method).replace(/\//gi, '');
      })
    })
    
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
