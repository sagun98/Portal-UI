import { ClarityModule } from '@clr/angular';
import { SwaggerUiModule } from './swagger-ui/swagger-ui.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SwaggerUiModule,
    ClarityModule,
    RouterModule
  ],
  declarations: [
    ProductCardComponent
  ],
  exports : [
    SwaggerUiModule,
    ProductCardComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }