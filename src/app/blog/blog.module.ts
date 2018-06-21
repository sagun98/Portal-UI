import { BlogsResolve } from 'src/app/blog/resolves/blogs.resolve';
import { BlogResolve } from './resolves/blog.resolve';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { ManageArticleModule } from './manage-article/manage-article.module';
import { ClarityModule } from '@clr/angular';
import { BlogRoutes } from './blog.routes';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { RouterModule } from '@angular/router';
import { BlogSideNavigationComponent } from './blog-side-navigation/blog-side-navigation.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { BlogCardComponent } from './blog-card/blog-card.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ManageArticleModule,
    RouterModule.forChild(BlogRoutes)
  ],
  declarations: [
    BlogComponent, 
    BlogSideNavigationComponent, ViewBlogComponent, BlogCardComponent
  ],
  providers : [
    BlogResolve,
    BlogsResolve
  ],
  exports : [
    ManageArticleModule,
    ManageArticleComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogModule { }
