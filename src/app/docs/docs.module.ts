// import { NodebbModule } from '../domain/nodebb/nodebb.module';
import { ApiModule } from './api/api.module';
import { ApisResolve } from '../resolves/apis.resolve';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { LayoutsModule } from '../core';
import { documentationRoutes } from './docs.routes';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from './product/product.module';
import { ManageApiModule } from './api/manage-api/manage-api.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { ApiSearchModule } from './api-search/api-search.module';
import { CoreSharedModule } from '../core/core-shared/core-shared.module';
import { DocsSharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    LayoutsModule,
    ApiModule,
    ManageApiModule,
    ProductModule,
    ApiSearchModule,
    SharedModule,
    CoreSharedModule,
    DocsSharedModule,
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
