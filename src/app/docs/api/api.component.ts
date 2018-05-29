import { ProxyDefinitionReolsve } from './resolves/proxy-definition.resolve';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { TINYCMCE_CONFIG } from '../constants/tinymce.constant';
import { ProxyService } from './proxy.service';
import { DomSanitizer } from '@angular/platform-browser';

import tinymce from 'tinymce/tinymce';
import jsyaml from 'js-yaml/dist/js-yaml.js';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  public tinymceConfig = TINYCMCE_CONFIG;
  public proxyDefinition:any;

  public isUploadOpen: boolean = false;
  
  public activeEditor = {
    overview : false,
    gettingStarted : false,
    reference : false
  }

  constructor(
    private proxyService: ProxyService,
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.proxyDefinition = data.proxyDefinition;
    });

    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, {save_onsavecallback : () => {}});
  }

  // shorthand to get yaml -> json
  public get swaggerJson () {
    const swaggerJson = jsyaml.load(this.proxyDefinition.swagger);
    return swaggerJson;
  }

  // shorthand to get overview
  public get overview (){
    if(this.proxyDefinition.overview.items[0]){
        return this.proxyDefinition.overview.items[0].content;
    }
    return null;
  }

  // shorthand to get overview
  public get overviewSafe (){
    if(this.proxyDefinition.overview.items[0]){
        return this.domSanitizer.bypassSecurityTrustHtml( this.proxyDefinition.overview.items[0].content );
    }
    return null;
  }

  // shorthand to set overview
  public set overview (content) {
    if(this.proxyDefinition.overview.items[0])
      this.proxyDefinition.overview.items[0].content = content;
    else
      this.proxyDefinition.overview.items.push({
        content : content,
        type : 'apostrophe-rich-text'
      });
  }

  // shorthand to get gettingStarted
  public get gettingStarted (){
    if(this.proxyDefinition.gettingStarted.items[0])
      return this.proxyDefinition.gettingStarted.items[0].content;

    return null;
  }

  // shorthand to get gettingStarted safe
  public get gettingStartedSafe (){
    if(this.proxyDefinition.gettingStarted.items[0])
      return this.domSanitizer.bypassSecurityTrustHtml( this.proxyDefinition.gettingStarted.items[0].content );

    return null;
  }

  // shorthand to set overview
  public set gettingStarted (content) {
    if(this.proxyDefinition.gettingStarted.items[0])
      this.proxyDefinition.gettingStarted.items[0].content = content;
    else
      this.proxyDefinition.gettingStarted.items.push({
        content : content,
        type : 'apostrophe-rich-text'
      })
  }

  // shorthand to get overview
  public get reference (){
    if(this.proxyDefinition.reference.items[0])
      return this.proxyDefinition.reference.items[0].content;
    
    return null;
  }

  // shorthand to set overview
  public set reference (content) {
    if(this.proxyDefinition.reference.items[0])
      this.proxyDefinition.reference.items[0].content = content;
    else
      this.proxyDefinition.reference.items.push({
        content : content,
        type : 'apostrophe-rich-text'
      })
  }

  public handleSave(editor) {
    let override = false;

    if(! this.activeEditor[editor.editor.id] && ! editor.editor.isNotDirty )
      override = confirm("You have unsaved changes.  Do you want to save your changes before you close the editor?");

    if(this.activeEditor[editor.editor.id] || override){
      this[editor.editor.id] = editor.editor.getBody().innerHTML;

      this.proxyService.setProxyDefinition(this.proxyDefinition['_id'], this.proxyDefinition).subscribe(updatedProxyDefinition => {
        this.proxyDefinition = updatedProxyDefinition;
      });
    }
  }

}
