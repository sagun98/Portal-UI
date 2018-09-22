import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApigeeManagementFormComponent } from './apigee-management-form/apigee-management-form.component';
import { ProductApiToolsComponent } from './product-api-tools.component';

const COMPONENTS = [
  ApigeeManagementFormComponent,
  ProductApiToolsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports : [
    ...COMPONENTS
  ],
  schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductApiToolsModule { }
