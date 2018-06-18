import { PageNotFoundComponent } from "./core/layouts/page-not-found/page-not-found.component";
import { Routes } from '@angular/router';
import { LoggedInGuard } from "./core/guards/loggedIn/logged-in.guard";

export const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent },
    // { path : 'products/:productId', component : ProductComponent}
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path : 'home', loadChildren: './home/home.module#HomeModule'},
    { path : 'docs', loadChildren : './docs/docs.module#DocsModule', canActivateChild : [LoggedInGuard]},
    { path : 'blog', loadChildren : './blog/blog.module#BlogModule', canActivateChild : [LoggedInGuard]},
    { path: '**', component: PageNotFoundComponent }
  ];
  