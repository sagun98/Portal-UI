import { ClarityModule } from '@clr/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule
  ],
  declarations: [
    ProductCardComponent
  ],
  exports : [
    ProductCardComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
