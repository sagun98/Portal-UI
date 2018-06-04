import { ActiveLinkDirective } from './sub-navigation/active-link.directive';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule
  ],
  declarations: [
    SideNavigationComponent, 
    PageNotFoundComponent, 
    HeaderComponent, 
    SubNavigationComponent,
    ActiveLinkDirective
  ],
  exports : [
    SideNavigationComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SubNavigationComponent
  ]
})
export class LayoutsModule { }
