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
import { CoreSharedModule } from '../core-shared/core-shared.module';
import { UserSettingsModalComponent } from './user-settings-modal/user-settings-modal.component';
import { RoleManagementComponent } from './user-settings-modal/role-management/role-management.component';
import { NgSelectModule } from '../../../../node_modules/@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule,
    CoreSharedModule,
    NgSelectModule,
    CoreSharedModule
  ],
  declarations: [
    SideNavigationComponent, 
    PageNotFoundComponent, 
    HeaderComponent, 
    SubNavigationComponent,
    ActiveLinkDirective,
    LoginComponent,
    UserCardComponent,
    UserSettingsModalComponent,
    RoleManagementComponent
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
