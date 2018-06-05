import { ApiModule } from './api/api.module';
import { ApisResolve } from './../resolves/apis.resolve';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { LayoutsModule } from '../core';

import { ApiComponent } from './api/api.component';
import { ProxyDefinitionReolsve } from './api/resolves/proxy-definition.resolve';
import { ProxyService } from './api/proxy.service';
import { SwaggerUiModule } from '../shared/swagger-ui/swagger-ui.module';
import { documentationRoutes } from './docs.routes';
import { ProductPageComponent } from './product-page/product-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from './product/product.module';
import { ProductResolve } from '../resolves/product.resolve';
import { ProductsResolve } from '../resolves/products.resolve';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    LayoutsModule,
    ApiModule,
    ProductModule,
    SwaggerUiModule,
    SharedModule,
    RouterModule.forChild(documentationRoutes)
  ],
  declarations: [DocsComponent, ProductPageComponent],
  providers : [
    ApisResolve,
    ProxyService,
    ProxyDefinitionReolsve
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocsModule { }
