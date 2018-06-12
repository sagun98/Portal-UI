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
