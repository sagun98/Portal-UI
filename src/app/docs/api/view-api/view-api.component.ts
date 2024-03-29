import { APIDetail } from './../../../core/interfaces/api-detail.interface';
import { ToastrService } from 'ngx-toastr';
import { ApigeeKeyStrategy } from '../../../core/enums/apigee-key-strategy.enum';
import { UserService } from '../../../core/services/user/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from '../../../../assets/javascript/swagger-ui-dist';
import { EntityComponent } from '../../../core/classes/EntityComponent';
import { Privilege } from '../../../core/interfaces/permissible.interface';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { NodeBBCategoryService } from '../../../domain/nodebb/category/nodebb-category.service';
import { SwaggerUIRequest } from '../../../core/interfaces/swagger-ui-request.interface';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api-service/api.service';
import { API } from '../../../core/interfaces/api.interface';

export const swaggerUIBundle = SwaggerUIBundle;
export const swaggerUIStandalonePreset = SwaggerUIStandalonePreset;

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
  public following: boolean = false;
  public isEntityAdmin: boolean = false;
  public announcementCid: number;
  public bypassCORS: boolean = true;

  public safeOverview: SafeHtml;
  public safeGettingStarted: SafeHtml;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private userService : UserService,
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private permissionService: PermissionsService,
    private nodeBBService: NodeBBCategoryService,
  ){
    super(); 
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.api = data.api || this.api;
      this.setSwaggerUI();
      this.following = this.userService.isFollowingEntity(this.api.followers);
      this.isEntityAdmin = this.permissionService.isEntityAdmin(this.api);

      this.safeOverview = this.domSanitizer.bypassSecurityTrustHtml(this.api.overview);
      this.safeGettingStarted = this.domSanitizer.bypassSecurityTrustHtml(this.api.gettingStarted);
    
      if(this.isEntityAdmin){
        this.announcementCid = this.api.cid;
        this.nodeBBService.getChildCategoryId(this.api.cid, 'announcements').subscribe(cid => {
          this.announcementCid = cid;
        });
      }

      setTimeout(t => {
        document['removeAllListeners']('focus');
        // window['removeAllListeners']('message');
      }, 1000);
      this.apikeyModalOpen = false;
    });

    this.removeSwaggerAPISearch();
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

  public getApiByVersion (apiDetail: APIDetail) : void {
    this.router.navigate([`/docs/api/${this.api.slug}/version/${apiDetail.apiVersion}`], {relativeTo: this.activatedRoute}).then(success => {

    });
  }

  private setSwaggerUI () {
    const ui = swaggerUIBundle({
      spec : this.swaggerJson,
      domNode: document.querySelector('#swagger-ui'),
      deepLinking: false,
      filter : false,
      presets: [
          swaggerUIBundle.presets.apis,
          swaggerUIStandalonePreset
      ],
      plugins: [
          swaggerUIBundle.plugins.DownloadUrl
      ],
      layout: 'StandaloneLayout',

      displayRequestDuration : true,
      
      requestInterceptor : (request : SwaggerUIRequest) => {
        // If you want to bypass the CORS implementation on the server
        if(this.bypassCORS) {
          const BASE_URL = (/http/.test(environment.swaggerProxyBase)) ?  environment.swaggerProxyBase : window.location.origin;
          request.url = `${BASE_URL}${decodeURIComponent(request.url)}`;
        }

        return request;
      },

      responseInterceptor : (response) => {

      },

      showMutatedRequest : false

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
  public get overviewSafe () : any{
    return this.domSanitizer.bypassSecurityTrustHtml( this.api.overview );
  }

  // shorthand to get gettingStarted safe
  public get gettingStartedSafe (): any{
    return this.domSanitizer.bypassSecurityTrustHtml( this.api.gettingStarted );
  }

  // shorthand to get reference safe
  public get referenceSafe () : any{
    return this.domSanitizer.bypassSecurityTrustHtml( this.api.reference );
  }

  public openApiKeyModal () : void {
    this.apikeyModalOpen = false;

    setTimeout( t => {
      this.apikeyModalOpen = true;
    }); 
  }

  public follow () {
    this.apiService.follow(this.api.id, this.api.cid).subscribe(api => {
      this.toastrService.info("You are now following " + this.api.name);
      this.following = this.userService.isFollowingEntity(api.followers);
      this.api = api;
    });
  }

  public unfollow () {
    this.apiService.unfollow(this.api.id, this.api.cid).subscribe(api => {
      this.toastrService.info("You are no longer following " + this.api.name);
      this.following = this.userService.isFollowingEntity(api.followers);
      this.api = api;
    });
  }

  private removeSwaggerAPISearch () {
    try {
      document.querySelector(".download-url-input").remove();
      document.querySelector(".download-url-button").remove();
    }catch (e) {
      // unable to remove the buttons
      console.error("Unable to remove unrendered elements");
    }
  }

  protected getPermissionService(): PermissionsService {
    return this.permissionService
  }
}