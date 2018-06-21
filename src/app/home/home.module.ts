import { SharedModule } from './../shared/shared.module';
import { ApisResolve } from './../resolves/apis.resolve';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ProductsResolve } from '../resolves/products.resolve';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', 
        component : HomeComponent
      }
    ])
  ],
  
  declarations: [HomeComponent],
  
  exports : [
    HomeComponent 
  ],
  
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
