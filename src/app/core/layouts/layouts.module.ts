import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule
  ],
  declarations: [SideNavigationComponent, PageNotFoundComponent, HeaderComponent],
  exports : [
    SideNavigationComponent,
    PageNotFoundComponent,
    HeaderComponent
  ]
})
export class LayoutsModule { }
