import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { NewProductComponent } from './new-product/new-product.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExistingProductComponent } from './existing-product/existing-product.component';
import { ApiModule } from '../api/api.module';

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
    NewProductComponent,
    ExistingProductComponent
  ],
  exports : [
    NewProductComponent,
    ExistingProductComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
