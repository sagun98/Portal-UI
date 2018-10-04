import { ClarityModule } from '@clr/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewApiComponent } from './view-api/view-api.component';
import { ApiResolve } from './resolves/api.resolve';
import { CoreSharedModule } from '../../core/core-shared/core-shared.module';
import { DocsSharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    CoreSharedModule,
    DocsSharedModule,
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
