import { ManageArticleComponent } from './blog/manage-article/manage-article.component';
import { PageNotFoundComponent } from "./core/layouts/page-not-found/page-not-found.component";
import { Routes } from '@angular/router';
import { LoggedInGuard } from "./core/guards/loggedIn/logged-in.guard";
import { NodeBBBlogsResolve } from './resolves/blogs.resolve';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { 
      path : 'home', loadChildren: './home/home.module#HomeModule',
      resolve : {
        NodeBBBlogs : NodeBBBlogsResolve
      }
    },
    { path : 'docs', loadChildren : './docs/docs.module#DocsModule', canActivateChild : [LoggedInGuard]},
    { path : 'blog', loadChildren : './blog/blog.module#BlogModule', canActivateChild : [LoggedInGuard]},
    { path: '**', component: PageNotFoundComponent }
  ];
  