import { EditorModule } from '@tinymce/tinymce-angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageArticleComponent } from './manage-article.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ClarityModule
  ],
  declarations: [
    ManageArticleComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageArticleModule { }
