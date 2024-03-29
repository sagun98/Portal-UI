import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../core/services/user/user.service';
import { EntityComponent } from '../../../core/classes/EntityComponent';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TINYCMCE_CONFIG } from '../../constants/tinymce.constant';
import { ERROR_CLASSES } from '../../../core/constants/error-classes.constant';
import { SlugUtilityService } from '../../services/slug.service';
import { PortalUser } from '../../../core/interfaces/fr-user.interface';
import { UserPrivilegeClass } from '../../../core/classes/user-privilege';
import { ToastrService } from 'ngx-toastr';
import { isNull } from 'util';
import { ApiService } from '../../../core/services/api-service/api.service';
import { API } from '../../../core/interfaces/api.interface';
import { Product } from '../../../core/interfaces/product.interface';
import { ProductService } from '../../../core/services/product-service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent extends EntityComponent implements OnInit{

  public activeApi: API;
  public product: Product;
  public apis: any[];
  public form: FormGroup;
  public tinymceConfig = TINYCMCE_CONFIG;
  public errorClasses = ERROR_CLASSES;
  public submitted: boolean = false;
  public showOverview: boolean = false;
  public saveMethod: string = 'addProduct';
  public manageAPIPrivilegesModalOpened: boolean = false;
  public APIUserPrivileges: UserPrivilegeClass[] = [];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected productService: ProductService,
    protected apiService : ApiService,
    protected formBuilder: FormBuilder,
    protected slugUtilService : SlugUtilityService,
    protected userService : UserService,
    protected toastrService: ToastrService,
    protected router : Router,
    protected permissionService: PermissionsService
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.apis = data.apiData;
      this.saveMethod = data.saveMethod;
      this.product = <Product>data.product || <Product>{
        overview: '',
        version : null
      };

      this.activeApi = null;
      this.showOverview = (this.product.overview && this.product.overview.length) ? true : false;
    });
    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200, save_onsavecallback: () => { } });
    this.buildForm();
  }

  public get title () {
    const title = (this.product.id) ? `Edit ${this.product.name}` : "Create New API Collection";
    return title;
  }

  protected buildForm() {
    this.form = this.formBuilder.group({
      id: [this.product.id],
      cid : [ this.product.cid, [] ],
      version: [this.product.version, []],
      name: [this.product.name, [Validators.required]],
      slug: [this.product.slug, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      overview: [this.product.overview],
      apis: [this.product.apis]
    });

    this.form.get('slug').disable();

    this.form.get('name').valueChanges.subscribe(value => {
      if(this.form.get('slug').disabled && ! this.product.version)
        this.form.get('slug').setValue( this.slugUtilService.formatSlug(value) );
    });

    if( ! this.userService.isAdmin() )
      this.disableFormBasedOnPrivileges(this.form, this.product);
  }

  public saveProduct() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (!this.showOverview)
      this.form.get('overview').setValue('');

    const productData = this.form.getRawValue();

    if(productData.apiManagementTool && (isNull(productData.apiManagementTool.name) || productData.apiManagementTool.name == 'null'))
      delete productData.apiManagementTool;

    this.productService[this.saveMethod](productData).subscribe((product: Product) => {
      this.cacheProduct();
      this.router.navigate([`/docs/apicollections/${product.slug}`]);
    });
  }

  public getApiDefinition(api, isOpen: boolean) {
    if (!isOpen) {
      this.activeApi = null;
      return;
    }

    this.apiService.getApi(api.id).subscribe((activeApi: API) => {
      this.activeApi = activeApi;
    });
  }

  public handleDelete () {
    const doDelete = confirm('Are you sure you want to delete this product?');

    if( doDelete )
      this.productService.deleteProduct(this.product).subscribe(product => {
        this.router.navigate([`/docs/apicollections`]);
      });
  }
  

  public cacheProduct () {
    if(this.productService._product_cache_)
      this.productService.provideCachedVersion.product = true;
  }

  public validateUserRoles = (user : PortalUser) => {
    return (user.roleMap.ADMIN || user.roleMap["PRODUCT_OWNER"]);
  }

  public validateAPIUserRoles = (user : PortalUser) => {
    return (user.roleMap.ADMIN || user.roleMap["API_DEVELOPER"]);
  }

  public saveFineGrainedPrivileges (privileges : UserPrivilegeClass[]) {
    this.productService.updateFineGrainedPrivileges(this.product.id, privileges).subscribe( (product : Product) => {
      this.toastrService.success('API User Privileges successfully updated');
      this.product = product;
      this.form.get('version').setValue(product.version);
    });
  }

  public saveAPIFGPs (privileges : UserPrivilegeClass[]) {
    this.productService.updateAPIUserPrivileges(this.product.id, privileges).subscribe(product => {
      this.toastrService.success('API User Privileges successfully updated');
      this.product = product;
      this.form.get('version').setValue(product.version);
    })
  }

  public openAPIUserPrivilegeModal () {
    this.manageAPIPrivilegesModalOpened = false;

    this.productService.getAPIPrivileges(this.product.id).subscribe(APIUserPrivileges => {
      this.APIUserPrivileges = APIUserPrivileges;
      setTimeout(t => { this.manageAPIPrivilegesModalOpened = true;});
    });
  }

  public getEntityPrivileges () : Observable<Object> {
    return this.productService.getPrivileges(this.product.id);
  }

  protected getPermissionService(): PermissionsService {
    return this.permissionService
  }
}
