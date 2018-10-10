import { ApigeeKeyStrategy } from '../../../core/enums/apigee-key-strategy.enum';
import { UserService } from '../../../core/services/user/user.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { API } from '../interfaces/api.interface';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from '../../../../assets/javascript/swagger-ui-dist';
import { EntityComponent } from '../../../core/classes/EntityComponent';
import { Privilege } from '../../../core/interfaces/permissible.interface';
// import { SwaggerEditor, SwaggerEditorStandalonePreset } from 'swagger-editor-dist';

export const swaggerUIBundle = SwaggerUIBundle;
export const swaggerUIStandalonePreset = SwaggerUIStandalonePreset;
// export const swaggerEditor = SwaggerEditor;
// export const swaggerEditorStandalonePreset = SwaggerEditorStandalonePreset;

@Component({
  selector: 'api',
  templateUrl: './view-api.component.html',
  styleUrls: ['./view-api.component.scss']
})
export class ViewApiComponent extends EntityComponent implements OnInit {

  @Input() api: API = null;

  public apiKey: string = '';
  public apikeyModalOpen: boolean = false;
  public keyStrategy = ApigeeKeyStrategy;

  constructor(
    private activatedRoute : ActivatedRoute,
    private userService : UserService,
    private domSanitizer: DomSanitizer,
  ){
    super(); 
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.api = data.api || this.api;
      this.setSwaggerUI();
      setTimeout(t => {
        document['removeAllListeners']('focus');
      });
      this.apikeyModalOpen = false;
    });

    // const editor = SwaggerEditorBundle({
    //   dom_id: '#swagger-editor',
    //   layout: 'StandaloneLayout',
    //   spec : this.swaggerJson,
    //   presets: [
    //     SwaggerEditorStandalonePreset
    //   ]
    // })
  }

  public get canEditThisApi () {
    let matches = false;

    if(this.api.userPrivileges) {
      this.api.userPrivileges.forEach( (fineGrainedPrivilege: Privilege) =>  {
        fineGrainedPrivilege.permissions.forEach(permission => {
          if(permission === 'MODIFY' && (fineGrainedPrivilege.username === this.userService.staticUser.username) )
            matches = true;
        });
      });
    }
    return matches;
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
    if(this.api.swagger){
      Object.keys( this.api.swagger['paths'] ).forEach(path => {
        const swaggerPath = this.api.swagger['paths'][path];
        Object.keys( swaggerPath ).forEach(method => {
          this.api.swagger['paths'][path][method].operationId = path.concat(method).replace(/\//gi, '');
        })
      });
    }
    
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

  public openApiKeyModal () : void {
    this.apikeyModalOpen = false;

    setTimeout( t => {
      this.apikeyModalOpen = true;
    }); 
  }
}
