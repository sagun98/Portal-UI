import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutes, DocumentationRoutingModule } from './documentation.routes';
import { DocumentationSideNavigationComponent } from './documentation-side-navigation/documentation-side-navigation.component';
import { DocumentationLandingPageComponent } from './documentation-landing-page/documentation-landing-page.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { ManageArticleComponent } from './manage-article/manage-article.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentationRoutingModule,
    EditorModule,
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
    DocumentationLandingPageComponent
  ],

  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentationModule { }