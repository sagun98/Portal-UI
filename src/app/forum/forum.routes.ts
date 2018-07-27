import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const ForumRoutes: Routes = [
    { path: '', component: ForumComponent, children : [
         {path : '**', component : ForumComponent }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(ForumRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class ForumRoutingModule { }