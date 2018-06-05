import { ExistingProductComponent } from './product/existing-product/existing-product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsResolve } from "../resolves/products.resolve";
import { ApiComponent } from "./api/api.component";
import { ProxyDefinitionReolsve } from "./api/resolves/proxy-definition.resolve";
import { Routes } from "@angular/router";
import { DocsComponent } from "./docs.component";
import { ApisResolve } from '../resolves/apis.resolve';
import { NewProductComponent } from './product/new-product/new-product.component';
import { ProductResolve } from '../resolves/product.resolve';

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
                    productData: ProductsResolve
                }
            },
            {
                path: 'product/new',
                component: NewProductComponent,
                resolve: {
                    apiData: ApisResolve
                }
            },
            {
                path: 'product/:productId',
                component: ExistingProductComponent,
                resolve: {
                    apiData: ApisResolve,
                    product: ProductResolve
                }
            },
            {
                path: 'api/:apiId', component: ApiComponent,
                resolve: {
                    proxyDefinition: ProxyDefinitionReolsve
                }
            }
        ]
    },
];