import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiApiToolsComponent } from './api-api-tools.component';
import { ApigeeApiToolComponent } from './apigee-api-tool/apigee-api-tool.component';

const COMPONENTS = [
  ApiApiToolsComponent,
  ApigeeApiToolComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports : [
    ...COMPONENTS
  ]
})
export class ApiApiToolsModule { }
