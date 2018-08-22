import { Observable } from 'rxjs/Observable';
import { PortalUser } from '../../../core/interfaces/fr-user.interface';
import { EntityComponent } from '../../../core/classes/EntityComponent';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ERROR_CLASSES } from '../../../core/constants/error-classes.constant';
import { TINYCMCE_CONFIG } from '../../constants/tinymce.constant';
import { API } from '../interfaces/api.interface';
import { UserService } from '../../../core/services/user/user.service';
import { UserPrivilegeClass } from '../../../core/classes/user-privilege';

// TODO: possibly export this and move to another file
enum SWAGGER_UPLOAD_OPTION {
  FILE = 'file',
  URL = 'url'
}

@Component({
  selector: 'app-manage-api',
  templateUrl: './manage-api.component.html',
  styleUrls: ['./manage-api.component.scss']
})
export class ManageApiComponent extends EntityComponent implements OnInit {

  @Input() api: API = {name : null, description : null, overview : '', gettingStarted : '', reference : '', swagger : null, userPrivileges : []};
  
  public errorClasses = ERROR_CLASSES;
  public form: FormGroup;
  public submitted: boolean = false;
  public tinymceConfig = TINYCMCE_CONFIG;
  public saveMethod: string = 'addApi';
  public swaggerUploadOptions = SWAGGER_UPLOAD_OPTION;
  public swaggerOption: SWAGGER_UPLOAD_OPTION = SWAGGER_UPLOAD_OPTION.FILE;

  constructor(
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private toastrService: ToastrService
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
    });

    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200, save_onsavecallback: () => { } });

    this.buildForm();
  }

  private buildForm() {

    this.form = this.formBuilder.group({
      id : [this.api.id, []],
      version : [this.api.version, []],
      name : [this.api.name, [Validators.required]],
      description : [this.api.description, [Validators.required]],
      overview : [this.api.overview, []],
      gettingStarted : [this.api.gettingStarted, []],
      reference : [this.api.reference, []],
      swagger : [this.api.swagger, [/* Validators.required */]],
      file : [],
      tags : [this.UIFormattedTags, []],
      slug : [this.api.slug, [Validators.required]],
      swaggerUrl : [this.api.swaggerUrl],
      userPrivileges : [this.api.userPrivileges]
    });

    this.form.get('slug').disable();

    this.form.get('name').valueChanges.subscribe(name => {
      if( this.form.get('slug').disabled )
        this.setSlugValue(name);
    });

    if( ! this.userService.isAdmin() ) {
      this.disableFormBasedOnPrivileges(this.form, this.api);
    }
  }

  private getServerFormattedTags (tags: any[]) {
    return tags.map(tag => {
      return tag.label;
    })
  }

  private setSlugValue (name?: string) {
    name = name || this.form.get('name').value;
    let slug = name.replace(/[^A-Za-z0-9\s]/gi, '').replace(/\s+/gi, "_").toLowerCase();
    const lastCharacter = slug.substring(slug.length - 1, slug.length);

    if(lastCharacter === '_')
      slug = slug.substring(0, slug.length - 1);

    this.form.get('slug').setValue(slug);
  }

  public saveApi () {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    const apiData = this.form.getRawValue();

    apiData.tags = this.getServerFormattedTags( apiData.tags );

    ['overview', 'gettingStarted', 'reference'].forEach(id => {
      apiData[id] = window['tinymce'].get(id).contentDocument.body.innerHTML;
    });

    this.apiService[this.saveMethod](apiData).subscribe( (api: API) => {
      this.cacheApi();
      this.router.navigate([`/docs/api/${api.slug}`]);
    })
  }
  
  public get UIFormattedTags () {
    if(! this.api.tags)
      return [];

    return this.api.tags.map(tag => {
      return { label : tag };
    });
  }

  public cacheApi () {
    if(this.apiService._api_cache_)
      this.apiService.provideCachedVersion.api = true;
  }

  public handleDelete () {
    const doDelete = confirm('Are you sure you want to delete this api?');

    if( doDelete )
      this.apiService.deleteApi(this.api).subscribe(api => {
        this.router.navigate([`/docs/product`]);
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
    this.apiService.updateFineGrainedPrivileges(this.api.id, privileges).subscribe(r => {
      this.toastrService.success('API User Privileges successfully updated');
    });
  }

  public getEntityPrivileges () : Observable<Object> {
    return this.apiService.getPrivileges(this.api.id);
  }
}