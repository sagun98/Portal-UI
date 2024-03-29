import { CoreSharedModule } from '../../../core/core-shared/core-shared.module';
import { ClarityModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageApiComponent } from './manage-api.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RouterModule } from '@angular/router';
import { DocsSharedModule } from '../../shared/shared.module';
import { ApiApiToolsModule } from './api-api-tools/api-api-tools.module';
import { Swagger2AlertModalComponent } from './swagger2-alert-modal/swagger2-alert-modal.component';

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
    ApiApiToolsModule,
    CoreSharedModule
  ],
  declarations: [
    ManageApiComponent,
    Swagger2AlertModalComponent
  ],
  exports : [
    ManageApiComponent
  ],
  providers : [

  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageApiModule { }
