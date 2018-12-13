import { DocumentationAreasResolve } from './resolves/documentation-areas.resolve';
import { DocumentationLandingPageComponent } from './documentation-landing-page/documentation-landing-page.component';
import { Routes, RouterModule } from "@angular/router";
import { DocumentationResolve } from './resolves/documentation.resolve';
import { DocumentationComponent } from "./documentation.component";
import { DocumentationLandingPageResolve } from './resolves/landing-page.resolve';
import { NgModule } from '@angular/core';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { DocumentResolve } from './resolves/document.resolve';

export const DocumentationRoutes: Routes = [
    {
        path : '', component : DocumentationComponent, data : {category : 'Documentation'}, resolve : { DocumentationAreas : DocumentationAreasResolve, Blogs : DocumentationResolve },
        
        children : [
            { path : 'main', component : DocumentationLandingPageComponent, resolve : {LandingPage : DocumentationLandingPageResolve} },
            { path : ':blogId', component : ViewDocumentComponent, resolve : { BlogPost : DocumentResolve  } },
            { path: 'area', loadChildren: './manage-documentation-area/manage-documentation-area.module#ManageDocumentationAreaModule'}
        ]
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