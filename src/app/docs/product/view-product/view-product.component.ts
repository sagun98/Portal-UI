import { ApiService } from '../../api/api.service';
import { NodeBBCategoryService } from '../../../domain/nodebb/category/nodebb-category.service';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { ToastrService } from 'ngx-toastr';
import { Component, ViewChild } from '@angular/core';
import { API } from '../../api/interfaces/api.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../interfaces/product.interface';
import { EntityComponent } from '../../../core/classes/EntityComponent';
import { UserService } from '../../../core/services/user/user.service';
import { SideNavigationComponent } from '../../../core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent extends EntityComponent {

  public activeApi: API;
  public product: Product;
  public apis: any[];
  public apikeyModalOpen: boolean = false;
  public following: boolean = false;
  public isEntityAdmin: boolean = false;
  public announcementCid: number;
  public unpublishedCount: number = 0;
  public initialApiCount: number = 0;

  @ViewChild(SideNavigationComponent) sideNavigationComponent:SideNavigationComponent;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected productService: ProductService,
    protected apiService: ApiService,
    private userService : UserService,
    private toastrService: ToastrService,
    private permissionService: PermissionsService,
    private nodeBBService: NodeBBCategoryService
  ) { 
    super(); 
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.apis = data.apiData;
      this.product = <Product>data.product;
      this.activeApi = null;
      this.following = this.userService.isFollowingEntity(this.product.followers);
      this.isEntityAdmin = this.permissionService.isEntityAdmin(this.product);
      this.apikeyModalOpen = false;
      this.unpublishedCount = 0;
      this.initialApiCount = this.product.apis.length;

      if(this.isEntityAdmin){
        this.announcementCid = this.product.cid;
        this.nodeBBService.getChildCategoryId(this.product.cid, 'announcements').subscribe(cid => {
          this.announcementCid = cid;
        });
      }

      this.product.apis = this.product.apis.filter(api => {
        if(api !== null && !api.published)
          this.unpublishedCount++;

        return (api !== null && api.published === true);
      });
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

  public openApiKeyModal () {
    this.apikeyModalOpen = false;

    setTimeout( t => {
      this.apikeyModalOpen = true;
    }); 
  }

  public follow () {
    this.productService.follow(this.product.id, this.product.cid).subscribe(product => {
      this.toastrService.info("You are now following " + this.product.name);
      this.following = this.userService.isFollowingEntity(product.followers);
      this.product = product;
    });
  }

  public unfollow () {
    this.productService.unfollow(this.product.id, this.product.cid).subscribe(product => {
      this.toastrService.info("You are no longer following " + this.product.name);
      this.following = this.userService.isFollowingEntity(product.followers);
      this.product = product;
    });
  }

  public handleApikeyModalClosed (closed: boolean) : void {
    this.apikeyModalOpen = closed;
  }

  protected getPermissionService(): PermissionsService {
    return this.permissionService
  }
}
