import { RouterModule } from '@angular/router';
import { ActiveLinkDirective } from './sub-navigation/active-link.directive';
import { ClarityModule } from '@clr/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { LoginComponent } from './login/login/login.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule
  ],
  declarations: [
    SideNavigationComponent, 
    PageNotFoundComponent, 
    HeaderComponent, 
    SubNavigationComponent,
    ActiveLinkDirective,
    LoginComponent,
    UserCardComponent
  ],
  exports : [
    SideNavigationComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SubNavigationComponent,
    LoginComponent
  ],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LayoutsModule { }
