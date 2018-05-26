import { ApisResolve } from './../resolves/apis.resolve';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { LayoutsModule } from '../core';
import { ProductResolve } from '../resolves/products.resolve';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    LayoutsModule,
    RouterModule.forChild([
      {
        path : '', component : DocsComponent, 
        resolve : {
          apisData : ApisResolve,
          productData : ProductResolve
        }
      }
    ])
  ],
  declarations: [DocsComponent],
  providers : [
    ApisResolve,
    ProductResolve
  ]
})
export class DocsModule { }
