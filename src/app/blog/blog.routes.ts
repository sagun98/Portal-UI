import { BlogPostComponent } from './blog-post/blog-post.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { BlogComponent } from './blog.component';
import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { BlogResolve } from './resolves/blog.resolve';
import { BlogsResolve } from 'src/app/blog/resolves/blogs.resolve';
import { DocumentationLandingPageResolve } from './documentation/resolves/landing-page.resolve';
import { DocumentationComponent } from './documentation/documentation.component';
import { DocumentationLandingComponent } from './documentation/documentation-landing/documentation-landing.component';

export const BlogRoutes: Routes = [
    {
        path : 'documentation/new', component : ManageArticleComponent, data : { saveMethod : 'saveBlogPost' }
    },
    {
        path : 'documentation', component : DocumentationComponent, data : {category : 'Documentation'}, resolve : {
            Blogs : BlogsResolve
        },
        children : [
            { path : 'main', component : DocumentationLandingComponent, resolve : {LandingPage : DocumentationLandingPageResolve} },
            { path : ':blogId', component : ViewBlogComponent, resolve : { BlogPost : BlogResolve  } }
        ]
    },
    
    {
        path : 'documentation/:blogId/edit', component : ManageArticleComponent, data : {saveMethod : 'updateBlogPost'}, resolve : { BlogPost : BlogResolve }
    },

    {
        path : 'list', component : BlogComponent, data : {category : 'announcement'}, resolve : {Blogs : BlogsResolve} ,
        children : [
            {
                path : '**', component : BlogComponent, data : {category : 'announcement'}, resolve : {Blogs : BlogsResolve} ,
            }
        ]
    },

    
    //,
    // {
    //     path : 'list/new', component : ManageArticleComponent, data : { saveMethod : 'saveBlogPost' }
    // },
    // {
    //     path : 'post', component : BlogPostComponent, data : {category : 'announcement'}, resolve : {
    //         Blogs : BlogsResolve
    //     },
    //     children : [
    //         { path : ':blogId', component : ViewBlogComponent, resolve : { BlogPost : BlogResolve } }
    //     ]
    // },
    // {
    //     path : 'post/:blogId/edit', component : ManageArticleComponent, data : {saveMethod : 'updateBlogPost'}, resolve : { BlogPost : BlogResolve }
    // }
]