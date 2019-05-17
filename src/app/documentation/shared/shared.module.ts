import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationAreaSelectorComponent } from './documentation-area-selector/documentation-area-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DocumentationAreaSelectorComponent],
  exports : [DocumentationAreaSelectorComponent]
})
export class DocumentationSharedModule { }
