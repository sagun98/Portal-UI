import { ClarityModule } from '@clr/angular';
import { SwaggerUiModule } from './../../shared/swagger-ui/swagger-ui.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    ClarityModule,
    SwaggerUiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ApiComponent],
  exports : [
    ApiComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApiModule { }
