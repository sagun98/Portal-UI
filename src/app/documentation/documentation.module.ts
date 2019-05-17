import { ManageDocumentationModule } from './manage-documentation/manage-documentation.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation.routes';
import { DocumentationSideNavigationComponent } from './documentation-side-navigation/documentation-side-navigation.component';
import { DocumentationLandingPageComponent } from './documentation-landing-page/documentation-landing-page.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { CoreSharedModule } from '../core/core-shared/core-shared.module';
import { ManageDocumentationAreaModule } from './manage-documentation-area/manage-documentation-area.module';
import { DocumentationAreaComponent } from './documentation-side-navigation/documentation-area/documentation-area.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    DocumentationRoutingModule,
    ManageDocumentationModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CoreSharedModule,
    NgSelectModule
  ],

  declarations: [
    DocumentationComponent,
    DocumentationSideNavigationComponent,
    DocumentationLandingPageComponent,
    ViewDocumentComponent,
    DocumentationAreaComponent,
  ],

  exports : [
    ManageDocumentationAreaModule,
    DocumentationComponent,
    DocumentationSideNavigationComponent,
    DocumentationLandingPageComponent,
    ViewDocumentComponent,
  ],

  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentationModule { }