import { ClarityModule } from '@clr/angular';
import { SwaggerUiModule } from './../../shared/swagger-ui/swagger-ui.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    ClarityModule,
    SwaggerUiModule
  ],
  declarations: [ApiComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApiModule { }
