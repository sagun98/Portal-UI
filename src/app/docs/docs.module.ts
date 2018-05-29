import { ApiModule } from './api/api.module';
import { ApisResolve } from './../resolves/apis.resolve';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { LayoutsModule } from '../core';
import { ProductResolve } from '../resolves/products.resolve';
import { ApiComponent } from './api/api.component';
import { ProxyDefinitionReolsve } from './api/resolves/proxy-definition.resolve';
import { ProxyService } from './api/proxy.service';
import { SwaggerUiModule } from '../shared/swagger-ui/swagger-ui.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    LayoutsModule,
    ApiModule,
    SwaggerUiModule,
    // TODO: Move to a separate routes file
    RouterModule.forChild([
      {
        path : '', component : DocsComponent, 
        resolve : {
          apisData : ApisResolve,
          productData : ProductResolve
        },
        children : [
          {
            path : 'api/:apiId', component : ApiComponent, 
            resolve : {
              proxyDefinition : ProxyDefinitionReolsve
            }
          }
        ]
      },
      
    ])
  ],
  declarations: [DocsComponent],
  providers : [
    ApisResolve,
    ProductResolve,
    ProxyService,
    ProxyDefinitionReolsve
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocsModule { }
