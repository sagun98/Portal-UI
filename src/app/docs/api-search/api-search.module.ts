import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiSearchComponent } from './api-search.component';
import { ApiSearchResultsComponent } from './api-search-results/api-search-results.component';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxInfiniteScrollerModule,
    ClarityModule
  ],
  declarations: [ApiSearchComponent, ApiSearchResultsComponent, ApiSearchResultsComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApiSearchModule { }
