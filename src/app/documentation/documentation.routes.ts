import { DocumentationLandingPageComponent } from './documentation-landing-page/documentation-landing-page.component';
import { Routes, RouterModule } from "@angular/router";
import { DocumentationResolve } from './resolves/documentation.resolve';
import { DocumentationComponent } from "./documentation.component";
import { DocumentationLandingPageResolve } from './resolves/landing-page.resolve';
import { NgModule } from '@angular/core';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { DocumentResolve } from './resolves/document.resolve';
import { ManageArticleComponent } from './manage-article/manage-article.component';

export const DocumentationRoutes: Routes = [
    {
        path : 'new', component : ManageArticleComponent, data : {saveMethod : 'saveBlogPost'}
    },
    {
        path : '', component : DocumentationComponent, data : {category : 'Documentation'}, resolve : {
            Blogs : DocumentationResolve
        },
        children : [
            { path : 'main', component : DocumentationLandingPageComponent, resolve : {LandingPage : DocumentationLandingPageResolve} },
            { path : ':blogId', component : ViewDocumentComponent, resolve : { BlogPost : DocumentResolve  } }
        ]
    },
    {
        path : ':blogId/edit', component : ManageArticleComponent, data : {saveMethod : 'updateBlogPost'}, resolve : { BlogPost : DocumentResolve }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(DocumentationRoutes)
      ],
      exports: [RouterModule],
      providers: []
})
export class DocumentationRoutingModule {
}