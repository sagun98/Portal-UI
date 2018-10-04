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

  public createUser () {
    // const newNodeBBUser: NodeBBUser = {
    //   fullname : 'Derek Carter',
    //   username : 'UCARTD4',
    //   email : 'derek.carter@pearson.com',
    //   title : 'UCARTD4'
    // };

    // this.nodeBBUserService.createUser(newNodeBBUser).subscribe( (response:NodeBBUserCreateResponse) => {
    //   if(response.code === 'ok'){
        // const uid: number = 3;

        // const newCategory: NodeBBCategory = {
        //   description : 'Entitlements API Forum',
        //   name : 'Entitlements API Forum',
        //   icon : "fa-comments-o",
        //   privileges : [
        //     <NodeBBPrivilege> {
        //       uid : uid,
        //       isAdminOrMod : true
        //     }
        //   ],
        //   title : 'Entitlements API Forum'
        // }

        // this.nodeBBCategoryService.createCategory(newCategory, 1).subscribe(response => {
        //   let privilegeRequest: NodeBBPrivilegeRequest = {
        //     _uid : 1,
        //     privileges : ['moderate'],
        //     groups : [uid]
        //   };

        //   this.nodeBBCategoryService.setModerator(response.payload.cid, privilegeRequest).subscribe(r => {
        //     console.log("r: ", r);
        //   });
        // });
    //}
    //})
  }
}
