import { ForumRoutingModule } from './forum.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';

@NgModule({
  imports: [
    CommonModule,
    ForumRoutingModule
  ],
  declarations: [ForumComponent]
})
export class ForumModule { }
