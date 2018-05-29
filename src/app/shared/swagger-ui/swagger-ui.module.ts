import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwaggerUiComponent } from './swagger-ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyParamsComponent } from './body-params/body-params.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  declarations: [SwaggerUiComponent, BodyParamsComponent],
  exports : [
    SwaggerUiComponent
  ]
})
export class SwaggerUiModule { }
