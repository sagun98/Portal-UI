import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodebbModule } from './nodebb/nodebb.module';

const EXPORTS = [
  NodebbModule
]

@NgModule({
  imports: [
    CommonModule,
    ...EXPORTS
  ],
  declarations: [],
  exports : [
    ...EXPORTS
  ]
})
export class DomainModule { }
