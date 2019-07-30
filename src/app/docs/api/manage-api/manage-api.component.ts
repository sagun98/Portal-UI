import { LoadingInterceptorService } from './../../../core/loading-interceptor/loading-interceptor.service';
import { ApigeeClientService } from './../../../core/services/apigee-client/apigee-client.service';
import { APIDetail } from './../../../core/interfaces/api-detail.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { PortalUser } from '../../../core/interfaces/fr-user.interface';
import { EntityComponent } from '../../../core/classes/EntityComponent';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ERROR_CLASSES } from '../../../core/constants/error-classes.constant';
import { TINYCMCE_CONFIG } from '../../constants/tinymce.constant';
import { UserService } from '../../../core/services/user/user.service';
import { UserPrivilegeClass } from '../../../core/classes/user-privilege';
import { ManageApiService } from './manage-api.service';
import { Swagger2AlertModalComponent } from './swagger2-alert-modal/swagger2-alert-modal.component';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { BrowserMessage, SwaggerEditorLoaded, SwaggerEditorYAML } from '../../../core/interfaces/browser-message.interface';
import { SideNavigationService } from '../../../core/layouts/side-navigation/side-navigation.service';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api-service/api.service';
import { API } from '../../../core/interfaces/api.interface';
import { DevPortalProxy } from 'src/app/core/interfaces/dev-portal-proxy.interface';

// TODO: possibly export this and move to another file
enum SWAGGER_UPLOAD_OPTION {
  FILE = 'file',
  URL = 'url',
  DOCUMENT = 'document'
}

@Component({
  selector: 'app-manage-api',
  templateUrl: './manage-api.component.html',
  styleUrls: ['./manage-api.component.scss']
})
export class ManageApiComponent extends EntityComponent implements OnInit {

  @Input() api: API = {version : null, name : null, description : null, overview : '', gettingStarted : '', reference : '', swagger : null, userPrivileges : null, apiManagementTool : null, published : false};
  @ViewChild(Swagger2AlertModalComponent) swaggerMessageModal : Swagger2AlertModalComponent;
  
  public errorClasses = ERROR_CLASSES;
  public form: FormGroup;
  public submitted: boolean = false;
  public showSwaggerVersion2Message: boolean = false;
  public tinymceConfig = TINYCMCE_CONFIG;
  public saveMethod: string = 'addApi';
  public swaggerUploadOptions = SWAGGER_UPLOAD_OPTION;
  public swaggerOption: SWAGGER_UPLOAD_OPTION = SWAGGER_UPLOAD_OPTION.FILE;
  public editorUrl: SafeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl ( environment.editorUrl );
  private iframeLoaded:boolean = false;
  public sideNavOpen: boolean = true;
  private tempNewVersionFile;

  constructor(
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private manageApiService: ManageApiService,
    private toastrService: ToastrService,
    protected permissionService: PermissionsService,
    protected sideNavigationService: SideNavigationService,
    private domSanitizer: DomSanitizer,
    private loadingInterceptorService: LoadingInterceptorService,
    private apigeeClient : ApigeeClientService
  ) {
    super();
  }

  public get title () {
    const title = (this.api.id) ? `Edit ${this.api.name}` : "Create New API";
    return title;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.api = <API> data.api || this.api;
      this.saveMethod = data.saveMethod || this.saveMethod;

      if(this.api.version != null)
        this.swaggerOption = SWAGGER_UPLOAD_OPTION.DOCUMENT;
    });

    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200, save_onsavecallback: () => { } });

    this.buildForm();

    window.addEventListener('message', ( message: BrowserMessage<any> )  => {
      const iframe:any = document.getElementById("swagger-editor");

      this.acknowledgeIframeLoaded(message, iframe);

      this.updateSwaggerFromEditor(message);
    });    
  }

  private buildForm() {

    this.form = this.formBuilder.group({
      id : [this.api.id, []],
      cid : [this.api.cid, []],
      version : [this.api.version, []],
      name : [this.api.name, [Validators.required]],
      description : [this.api.description, [Validators.required]],
      overview : [this.api.overview, []],
      gettingStarted : [this.api.gettingStarted, []],
      reference : [this.api.reference, []],
      swagger : [this.api.swagger, [ /*Validators.required*/]],
      file : [],
      tags : [this.UIFormattedTags, []],
      slug : [this.api.slug, [Validators.required]],
      swaggerUrl : [this.api.swaggerUrl],
      userPrivileges : [this.api.userPrivileges],
      published : [this.api.published || false, [Validators.required]],
      deprecated : [this.api.deprecated || false, []],
      swaggerOption : [this.swaggerOption]
    });

    this.form.get('slug').disable();

    this.form.get('name').valueChanges.subscribe(name => {
      if( this.form.get('slug').disabled && ! this.api.version)
        this.setSlugValue(name);
    });

    if( ! this.userService.isAdmin() ) {
      this.disableFormBasedOnPrivileges(this.form, this.api);

      setTimeout(t => {
        if(this.form.disabled){
          this.toastrService.warning('Not authorized to edit this API');
          this.router.navigate([`/docs/api/search`]);
        }
      });
    }

    this.form.get('swaggerOption').valueChanges.subscribe( (value:SWAGGER_UPLOAD_OPTION) => {
      this.form.get('swaggerUrl').clearValidators();

      if(value == SWAGGER_UPLOAD_OPTION.URL)
        this.form.get('swaggerUrl').setValidators(Validators.required);

      if(value === SWAGGER_UPLOAD_OPTION.DOCUMENT)
        this.openAPIEditor();

      this.form.get('swaggerUrl').updateValueAndValidity({emitEvent : false});
    });
  }

  private getServerFormattedTags (tags: any[]) {
    return tags.map(tag => {
      return tag.label;
    })
  }

  public openAPIEditor () : void {
    this.sideNavOpen = ! this.sideNavOpen;

    if(! this.sideNavOpen){
      if ( this.form.get('file').value ) {
        const reader = new FileReader();
        reader.readAsText(this.form.get('file').value, "UTF-8");
        reader.onload =  (evt:any) => {
          this.postSwaggerToEditor( document.getElementById("swagger-editor"), evt.target.result );
        }
      } else {
        this.postSwaggerToEditor( document.getElementById("swagger-editor"));
      }
    }

    this.sideNavigationService.setSideNavOpenState(this.sideNavOpen);
  }

  public getApiByVersion (apiDetail: APIDetail) : void {
    this.router.navigate([`/docs/api/${this.api.slug}/version/${apiDetail.apiVersion}/edit`], {relativeTo: this.activatedRoute}).then(success => {
      this.rebuildForm();
    });
  }

  public saveApi () {
    this.preSave().subscribe(apiData => {

      if(! apiData)
        return;

      this.manageApiService.getSwaggerVersion(apiData.file, apiData.swaggerUrl).subscribe(version => {
        if (version === 2){
          this.showSwaggerVersion2Message = true;
          this.swaggerMessageModal.onClosed.subscribe(closed => {
            if (closed)
              this.apiService[this.saveMethod](apiData).subscribe( 
                (api: API) => {
                  this.router.navigate([`/docs/api/${api.slug}`]);
                },
                error => {
                  this.showSwaggerVersion2Message = false;
                }
              );
          })
        }

        else
          this.apiService[this.saveMethod](apiData).subscribe( (api: API) => {
            this.router.navigate([`/docs/api/${api.slug}`]);
          });
      });
    });
  }

  public handleNewVersion () {
    this.tempNewVersionFile = this.form.get('file').value;
    this.api.apiVersion = 'New';
    this.api.deprecated = false;
    this.saveMethod = "createNewVersion";
    this.form.get('published').setValue(false);
    this.form.get('deprecated').setValue(false);
  }

  public handleVersionDelete () {
    const doDelete = confirm(`Are you sure you want to delete this version?`);

    if (doDelete) {
      this.apiService.deleteVersion(this.api, this.api.apiVersion).subscribe(api => {
        this.router.navigate([`/docs/api/${api.slug}/version/${api.apiVersion}/edit`]).then(navigated => {
          this.toastrService.success(`Version successfully deleted`);
          this.api = api;
          this.rebuildForm();
        });
      });
    }
  }

  private rebuildForm() {
    this.postSwaggerToEditor(document.getElementById("swagger-editor"), this.api.swagger);
    Object.keys(this.form.controls).forEach(controlName => {
      if (typeof this.api[controlName] !== "undefined")
        this.form.get(controlName).setValue(this.api[controlName], { emitEvent: false });
    });
  }

  public handleDeprecationClick () {
    const deprecated = this.form.get('deprecated').value;
    const verb = (deprecated) ? 'activate' : 'deprecate';

    const doDeprecation = confirm(`Are you sure you want to ${verb} this version?`);

    if (doDeprecation) {

      this.form.get('deprecated').setValue(! deprecated);

      this.preSave().subscribe(apiData => {
        this.apiService.updateApi(apiData).subscribe(api => {
          this.api = api;
          this.form.get('version').setValue(api.version);
          this.form.get('deprecated').setValue(api.deprecated);
          this.toastrService.success(`Successfully ${verb}d this version of the ${api.name} API`);
        });
      });
    }
  }

  public get UIFormattedTags () {
    if(! this.api.tags)
      return [];

    return this.api.tags.map(tag => {
      return { label : tag };
    });
  }

  public get backRoute () : string {
    return (this.api.id) ? '../' : '../search';
  }

  public handleDelete () {
    const doDelete = confirm('Are you sure you want to delete this api?');

    if( doDelete )
      this.apiService.deleteApi(this.api).subscribe(api => {
        this.router.navigate([`/docs/api/search`]);
      });
  }

  public handleUpload (event) {
    const file = event.target.files[0];

    this.form.get('file').setValue(file);
  }

  public validateUserRoles = (user : PortalUser) => {
    return (user.roleMap.ADMIN || user.roleMap.API_DEVELOPER);
  }

  public saveApiFineGrainedPrivileges (privileges : UserPrivilegeClass[]) {
    this.apiService.updateFineGrainedPrivileges(this.api.id, privileges).subscribe(api => {
      this.toastrService.success('API User Privileges successfully updated');
      this.api = api;
      
      this.form.get('version').setValue(api.version);
    });
  }

  public getEntityPrivileges () : Observable<Object> {
    return this.apiService.getPrivileges(this.api.id);
  }

  protected getPermissionService () : PermissionsService {
    return this.permissionService;
  }

  private formatApigeeProxyData () : DevPortalProxy {
    if(! this.form.controls.apiManagementTool)
      return null;
    let proxyFormGroup: FormGroup = this.form.controls.apiManagementTool as FormGroup;
    let proxyObject: DevPortalProxy = proxyFormGroup.getRawValue();
    let basePaths = Object.assign({}, proxyFormGroup.controls.basePaths);

    proxyObject.basePaths = basePaths.value.map(fc => { 
      return {
        name : fc.name,
        path : fc.path,
        targetServer : (fc.targetServer) ? fc.targetServer.value : ''
      };
    });

    return proxyObject as DevPortalProxy;
  }

  private preSave () : Observable<any> {
    return new Observable(observer => {
      this.submitted = true;
      this.form['submitted'] = true;

      const apiData = this.form.getRawValue();
        
      if(this.form.invalid) {
        if(! this.sideNavOpen)
          this.openAPIEditor();
        return;
      }

      apiData.apiManagementTool = this.formatApigeeProxyData();

      let saveApigee = new Observable(saveApigeeObserver => {      
        if(apiData.apiManagementTool && apiData.apiManagementTool.targetServers && apiData.apiManagementTool.targetServers.length && apiData.apiManagementTool.targetServers[0].targetServer) {
          this.loadingInterceptorService.$onLoadingTextChange.next("Creating APIGEE Proxy");
          this.apigeeClient.createProxy(apiData.apiManagementTool).subscribe(
            proxy => {
              this.toastrService.success('APIGEE Proxy has been successfully created');

              this.loadingInterceptorService.$onLoadingTextChange.next(null);

              setTimeout(t => {saveApigeeObserver.next(true);}, 1000);
            },
            error => {
              this.loadingInterceptorService.$onLoadingTextChange.next(null);
              setTimeout(t => {saveApigeeObserver.next(false);}, 1000);
            }
          );
        } else {
          saveApigeeObserver.next(true); 
        }
      });

      saveApigee.subscribe(success => {

        if(! success) {
          observer.next(false)
          observer.complete();
          return;
        }

        if (! apiData.file && ! apiData.swagger && !apiData.swaggerUrl ) {
          this.toastrService.error('Swagger file required.  Please upload a valid Swagger file, or provide a valid URL');
          return;
        }

        apiData.tags = this.getServerFormattedTags( apiData.tags );

        ['overview', 'gettingStarted', 'reference'].forEach(id => {
          apiData[id] = window['tinymce'].get(id).contentDocument.body.innerHTML;
        });

        if(apiData.swaggerOption === this.swaggerUploadOptions.URL)
          delete apiData.file;
      
        observer.next(apiData);
      });
    });
  }

  private updateSwaggerFromEditor (message : BrowserMessage<SwaggerEditorYAML>) {
    if (message.data && message.data.payload && message.data.payload.openAPI){
      var file = new File([message.data.payload.openAPI], "swagger.yml", {
        type: "text/plain",
      });

      this.form.get('file').setValue(file);
    }
  }

  private acknowledgeIframeLoaded (message : BrowserMessage<SwaggerEditorLoaded>, iframe: any) {
    if ((message.data && message.data.payload && message.data.payload.loaded) && ! this.iframeLoaded){
      this.iframeLoaded = true;

      this.postSwaggerToEditor(iframe);
    }
  }

  private postSwaggerToEditor (iframe: any, content?: string) {

    const swagger = content || this.form.get('swagger').value;

    iframe.contentWindow.postMessage({
          type : 'loaded',
          payload : {
            loaded : true,
            swagger : swagger
          }
        }, '*');
    }
}