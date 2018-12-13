import { NodeBBCategoryService } from '../../domain/nodebb/category/nodebb-category.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { USER_PERMISSIONS } from '../../core/enums/user-permissions.enum';
import { NodeBBUserService } from '../../domain/nodebb/user/nodebb-user.service';
// import { NodeBBUser } from '../../domain/nodebb/user/nodebb-user.interface';
// import { NodeBBUserCreateResponse } from '../../domain/nodebb/user/nodebb-user-response.interface';
// import { NodeBBCategory, NodeBBPrivilege } from '../../domain/nodebb/category/nodebb-category.interface';
// import { NodeBBPrivilegeRequest } from '../../domain/nodebb/category/nodebb-privilege-request.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public products: any[] = [];

  constructor(
    private activatedRoute : ActivatedRoute
    // private nodeBBUserService : NodeBBUserService,
    // private nodeBBCategoryService: NodeBBCategoryService
  ) { }

  public get permissions (): any {
    return USER_PERMISSIONS;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.products = data.productData;
    });
  }
}
