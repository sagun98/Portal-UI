import { SwaggerUiModule } from './swagger-ui/swagger-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SwaggerUiModule
  ],
  declarations: [],
  exports : [
    SwaggerUiModule
  ]
})
export class SharedModule { }
