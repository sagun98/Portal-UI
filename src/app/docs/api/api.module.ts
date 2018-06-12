import { ClarityModule } from '@clr/angular';
import { SwaggerUiModule } from './../../shared/swagger-ui/swagger-ui.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewApiComponent } from './view-api/view-api.component';
import { ApiResolve } from './resolves/api.resolve';

@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    ClarityModule,
    SwaggerUiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers : [
    ApiResolve
  ],
  declarations: [
    ViewApiComponent
  ],
  exports : [
    ViewApiComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApiModule { }
