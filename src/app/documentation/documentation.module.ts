import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation.routes';
import { DocumentationSideNavigationComponent } from './documentation-side-navigation/documentation-side-navigation.component';
import { DocumentationLandingPageComponent } from './documentation-landing-page/documentation-landing-page.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { CoreSharedModule } from '../core/core-shared/core-shared.module';

@NgModule({
  imports: [
    DocumentationRoutingModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    CoreSharedModule,
    NgSelectModule
  ],

  declarations: [
    DocumentationComponent,
    DocumentationSideNavigationComponent,
    DocumentationLandingPageComponent,
    ViewDocumentComponent,
    ManageArticleComponent
  ],

  exports : [
    DocumentationComponent,
    DocumentationSideNavigationComponent,
    DocumentationLandingPageComponent,
    ViewDocumentComponent,
    ManageArticleComponent
  ],

  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentationModule { }