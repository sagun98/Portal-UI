import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityPermissionsModalComponent } from './modals/entity-permissions-modal/entity-permissions-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreSharedModule } from '../../core/core-shared/core-shared.module';

const COMPONENTS = [
  EntityPermissionsModalComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    CoreSharedModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports : [
    ...COMPONENTS
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocsSharedModule { }
