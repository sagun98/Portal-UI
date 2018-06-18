import { ManageArticleModule } from './manage-article/manage-article.module';
import { ClarityModule } from '@clr/angular';
import { BlogRoutes } from './blog.routes';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ManageArticleModule,
    RouterModule.forChild(BlogRoutes)
  ],
  declarations: [
    BlogComponent, 
    BlogListComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogModule { }
