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

export const documentationRoutes: Routes = [
    {
        path: '', component: DocsComponent,
        resolve: {
            apisData: ApisResolve,
            productData: ProductsResolve
        },
        children: [
            {
                path: 'product',
                component: ProductPageComponent,
                resolve: {
                    productData: ProductsResolveCached
                }
            },
            {
                path: 'product/new',
                component: ManageProductComponent,
                resolve: {
                    apiData: ApisResolve
                },
                data : {
                    saveMethod : 'addProduct'
                }
            },
            {
                path: 'product/:productId',
                component: ViewProductComponent,
                resolve: {
                    product: ProductResolve
                }
            },
            {
                path: 'product/:productId/edit',
                component: ManageProductComponent,
                resolve: {
                    apiData: ApisResolve,
                    product: ProductResolve
                },
                data : {
                    saveMethod : 'updateProduct'
                }
            },
            {
                path : 'api/new', component : ManageApiComponent,
                data : {
                    saveMethod : 'addApi'
                }
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
                path : 'api/:apiId/edit', component : ManageApiComponent,
                resolve: {
                    api: ApiResolve
                },
                data : {
                    saveMethod : 'updateApi'
                }
            },
        ]
    },
];