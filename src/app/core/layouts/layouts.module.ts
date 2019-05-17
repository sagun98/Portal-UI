import { Angulartics2Module } from 'angulartics2';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { DevPortalFooterComponent } from './dev-portal-footer/dev-portal-footer.component';
import { RoleCardComponent } from './user-settings-modal/role-card/role-card.component';
import { UserModule } from 'src/app/user/user.module';
import { EmailComponent } from './email/email.component';
import { EditorModule } from '../../../../node_modules/@tinymce/tinymce-angular';
import { ManageSearchComponent } from './user-settings-modal/manage-search/manage-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule,
    CoreSharedModule,
    NgSelectModule,
    RouterModule,
    Angulartics2Module,
    CoreSharedModule,
    EditorModule,
    UserModule
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
    RoleManagementComponent,
    DevPortalFooterComponent,
    RoleCardComponent,
    EmailComponent,
    ManageSearchComponent
  ],
  exports : [
    SideNavigationComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SubNavigationComponent,
    LoginComponent,
    DevPortalFooterComponent,
    EmailComponent
  ],
  schemas : [
    //CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LayoutsModule { }
