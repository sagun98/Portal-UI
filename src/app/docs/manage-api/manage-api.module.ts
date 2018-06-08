import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageApiComponent } from './manage-api.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RouterModule } from '@angular/router';
import { FileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule,
    FileDropModule,
    FileUploadModule
  ],
  declarations: [
    ManageApiComponent
  ],
  exports : [
    ManageApiComponent
  ],
  providers : [

  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageApiModule { }
