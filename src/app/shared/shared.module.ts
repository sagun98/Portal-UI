import { ClarityModule } from '@clr/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { RequestApiModalComponent } from './request-api-modal/request-api-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ProductCardComponent,
    RequestApiModalComponent
  ],
  exports : [
    ProductCardComponent,
    RequestApiModalComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }