import { ApiSearchComponent } from './api-search/api-search.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsResolve, ProductsResolveCached } from "../resolves/products.resolve";
import { Routes } from "@angular/router";
import { DocsComponent } from "./docs.component";
import { ApisResolve } from '../resolves/apis.resolve';
import { ProductResolve } from '../resolves/product.resolve';
import { ManageApiComponent } from './api/manage-api/manage-api.component';
import { ViewApiComponent } from './api/view-api/view-api.component';
import { ManageProductComponent } from './product/manage-product/manage-product.component';
import { ApiResolve } from './api/resolves/api.resolve';
import { RoleCheckGuard } from '../core/guards/role-check/role-check.guard';

export const documentationRoutes: Routes = [
    {
        path: '', component: DocsComponent,
        resolve: {
            apisData: ApisResolve,
            productData: ProductsResolve
        },
        children: [
            {
                path: 'apicollections',
                component: ProductPageComponent,
                resolve: {
                    productData: ProductsResolveCached
                }
            },
            {
                path: 'apicollections/new',
                component: ManageProductComponent,
                resolve: {
                    apiData: ApisResolve
                },
                data : {
                    saveMethod : 'addProduct',
                    permissions : ['ADMIN', 'PRODUCT_OWNER']
                },
                canActivate : [RoleCheckGuard]
            },
            {
                path: 'apicollections/:productId',
                component: ViewProductComponent,
                resolve: {
                    product: ProductResolve
                }
            },
            {
                path: 'apicollections/:productId/edit',
                component: ManageProductComponent,
                resolve: {
                    apiData: ApisResolve,
                    product: ProductResolve
                },
                data : {
                    saveMethod : 'updateProduct',
                    permissions : ['ADMIN', 'PRODUCT_OWNER']
                },
                canActivate : [RoleCheckGuard]
            },
            {
                path : 'api/new', component : ManageApiComponent,
                data : {
                    saveMethod : 'addApi',
                    permissions : ['ADMIN', 'API_DEVELOPER']
                },
                canActivate : [RoleCheckGuard]
            },
            {
                path : 'api/search', component : ApiSearchComponent
            },
            {
                path: 'api/:apiId', component: ViewApiComponent,
                resolve: {
                    api: ApiResolve
                }
            },
            {
                path : 'api/:apiId/edit', component : ManageApiComponent, canActivate : [RoleCheckGuard],
                resolve: {
                    api: ApiResolve
                },
                data : {
                    saveMethod : 'updateApi',
                    permissions : ['API_DEVELOPER']
                }
            },
        ]
    },
];