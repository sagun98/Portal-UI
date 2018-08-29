import { RouterModule } from '@angular/router';
import { CoreSharedModule } from '../../core/core-shared/core-shared.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiSearchComponent } from './api-search.component';
import { ApiSearchResultsComponent } from './api-search-results/api-search-results.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreSharedModule,
    RouterModule,
    ClarityModule
  ],
  declarations: [ApiSearchComponent, ApiSearchResultsComponent, ApiSearchResultsComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApiSearchModule { }
