import { ViewBlogComponent } from './view-blog/view-blog.component';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { BlogComponent } from './blog.component';
import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { BlogResolve } from './resolves/blog.resolve';
import { BlogsResolve } from 'src/app/blog/resolves/blogs.resolve';

export const BlogRoutes: Routes = [
    {
        path : 'documentation', component : BlogComponent, data : {category : 'documentation'}, resolve : {Blogs : BlogsResolve}
    },
    {
        path : 'documentation/new', component : ManageArticleComponent, data : { saveMethod : 'saveBlogPost' }
    },
    {
        path : 'documentation/:blogId', component : ViewBlogComponent, resolve : { BlogPost : BlogResolve }
    },
    {
        path : 'documentation/:blogId/edit', component : ManageArticleComponent, data : {saveMethod : 'updateBlogPost'}, resolve : { BlogPost : BlogResolve }
    },

    {
        path : 'posts', component : BlogComponent, data : {category : 'announcement'}, resolve : {Blogs : BlogsResolve}
    },
    {
        path : 'posts/new', component : ManageArticleComponent, data : { saveMethod : 'saveBlogPost' }
    },
    {
        path : 'posts/:blogId', component : ViewBlogComponent, resolve : { BlogPost : BlogResolve }
    },
    {
        path : 'posts/:blogId/edit', component : ManageArticleComponent, data : {saveMethod : 'updateBlogPost'}, resolve : { BlogPost : BlogResolve }
    }
]