import { CoreSharedModule } from './../../../core/core-shared/core-shared.module';
import { ClarityModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageApiComponent } from './manage-api.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RouterModule } from '@angular/router';
import { DocsSharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    EditorModule,
    NgSelectModule,
    RouterModule,
    DocsSharedModule,
    CoreSharedModule
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
