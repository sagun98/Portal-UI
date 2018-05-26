import { ApisResolve } from './../resolves/apis.resolve';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductResolve } from '../resolves/products.resolve';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', 
        component : HomeComponent,
        resolve : {
          productData : ProductResolve
        }
      }
    ])
  ],
  
  declarations: [HomeComponent, ProductCardComponent],
  
  providers : [
    ProductResolve
  ],
  
  exports : [
    HomeComponent
  ],
  
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
