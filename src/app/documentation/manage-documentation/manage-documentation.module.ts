import { CoreSharedModule } from '../../core/core-shared/core-shared.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDocumentationComponent } from './manage-documentation.component';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { DocsSharedModule } from '../../docs/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    EditorModule,
    NgSelectModule,
    CoreSharedModule,
    DocsSharedModule,
    ClarityModule
  ],

  declarations: [ManageDocumentationComponent],

  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageDocumentationModule { }
