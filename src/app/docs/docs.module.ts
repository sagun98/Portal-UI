import { ApiModule } from './api/api.module';
import { ApisResolve } from './../resolves/apis.resolve';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { LayoutsModule } from '../core';


import { SwaggerUiModule } from '../shared/swagger-ui/swagger-ui.module';
import { documentationRoutes } from './docs.routes';

import { SharedModule } from '../shared/shared.module';
import { ProductModule } from './product/product.module';
import { ProductResolve } from '../resolves/product.resolve';
import { ProductsResolve } from '../resolves/products.resolve';
import { ManageApiModule } from './api/manage-api/manage-api.module';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    LayoutsModule,
    ApiModule,
    ManageApiModule,
    ProductModule,
    SwaggerUiModule,
    SharedModule,
    RouterModule.forChild(documentationRoutes)
  ],
  declarations: [
    DocsComponent, 
    ProductPageComponent
  ],
  providers : [
    ApisResolve
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocsModule { }