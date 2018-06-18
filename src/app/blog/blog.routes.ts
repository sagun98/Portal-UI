import { ManageArticleComponent } from './manage-article/manage-article.component';
import { BlogComponent } from './blog.component';
import { Component } from '@angular/core';
import { Routes } from "@angular/router";

export const BlogRoutes: Routes = [
    {
        path : 'new', component : ManageArticleComponent
    },
    {
        path : ':blogId', component : BlogComponent
    }
]