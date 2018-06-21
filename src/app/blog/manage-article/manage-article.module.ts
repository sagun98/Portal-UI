import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ManageArticleComponent } from "./manage-article.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ClarityModule } from "@clr/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgSelectModule,
    RouterModule,
    ClarityModule
  ],
  declarations: [
    ManageArticleComponent
  ],
  providers : [
    DatePipe
  ],
  exports : [
    ManageArticleComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageArticleModule { }
