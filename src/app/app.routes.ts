import { PageNotFoundComponent } from "./core/layouts/page-not-found/page-not-found.component";
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent },
    // { path : 'products/:productId', component : ProductComponent}
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path : 'home', loadChildren: './home/home.module#HomeModule'},
    { path : 'docs', loadChildren : './docs/docs.module#DocsModule' },
    { path: '**', component: PageNotFoundComponent }
  ];
  