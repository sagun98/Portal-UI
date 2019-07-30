import { PageNotFoundComponent } from "./core/layouts/page-not-found/page-not-found.component";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoggedInGuard } from "./core/guards/loggedIn/logged-in.guard";
import { NodeBBBlogsResolve } from './resolves/blogs.resolve';
import { NgModule } from '@angular/core';
import { ApigeeTargetServersComponent } from "./apigee-target-servers/apigee-target-servers.component";

export const appRoutes: Routes = [
  {
    path: '', loadChildren: './home/home.module#HomeModule',
    resolve: {
      NodeBBBlogs: NodeBBBlogsResolve
    }
  },
  { path : 'docs', loadChildren : './docs/docs.module#DocsModule', canActivate : [LoggedInGuard] },
  { path: 'apigeeTargetServers', component: ApigeeTargetServersComponent , pathMatch: 'full',canActivate : [LoggedInGuard]},
  { path: 'documentation', loadChildren: './documentation/documentation.module#DocumentationModule', canActivate : [LoggedInGuard] },
  { path: 'forum', loadChildren : './forum/forum.module#ForumModule', canActivate : [LoggedInGuard] },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, preloadingStrategy : PreloadAllModules, useHash : false, onSameUrlNavigation: "reload"}
    )
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }