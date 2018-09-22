import { ManageProductComponent } from './manage-product/manage-product.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApiModule } from '../api/api.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { CoreSharedModule } from '../../core/core-shared/core-shared.module';
import { DocsSharedModule } from '../shared/shared.module';
import { ProductApiToolsModule } from './manage-product/product-api-tools/product-api-tools.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgSelectModule,
    ClarityModule,
    ApiModule,
    CoreSharedModule,
    DocsSharedModule,
    ProductApiToolsModule,
    RouterModule
  ],
  declarations: [
    ManageProductComponent,
    ViewProductComponent
  ],
  exports : [
    ViewProductComponent,
    ManageProductComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
