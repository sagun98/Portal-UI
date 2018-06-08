import { ProxyDefinitionReolsve } from './resolves/proxy-definition.resolve';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { TINYCMCE_CONFIG } from '../constants/tinymce.constant';
import { ProxyService } from './proxy.service';
import { DomSanitizer } from '@angular/platform-browser';
import tinymce from 'tinymce/tinymce';
import jsyaml from 'js-yaml/dist/js-yaml.js';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevPortalAPI } from './api.model';

@Component({
  selector: 'api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  @Input() proxyDefinition: DevPortalAPI = null;
  public form: FormGroup;

  constructor(
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.proxyDefinition = data.proxyDefinition || this.proxyDefinition;
    });
  }

  // shorthand to get yaml -> json
  public get swaggerJson () {
    // used window global object to pass testing
    let swaggerJson = {};
    
    try {
      swaggerJson = jsyaml.load(this.proxyDefinition.swagger);
    } catch( e ) {
      swaggerJson = window['jsyaml'].load(this.proxyDefinition.swagger);
    }
    
    return swaggerJson;
  }

  // shorthand to get overview
  public get overviewSafe (){
    return this.domSanitizer.bypassSecurityTrustHtml( this.proxyDefinition.overview );
  }

  // shorthand to get gettingStarted safe
  public get gettingStartedSafe (){
    return this.domSanitizer.bypassSecurityTrustHtml( this.proxyDefinition.gettingStarted );
  }

  // shorthand to get reference safe
  public get referenceSafe (){
    return this.domSanitizer.bypassSecurityTrustHtml( this.proxyDefinition.reference );
  }
}
