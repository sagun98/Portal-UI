import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiApiToolsComponent } from './api-api-tools.component';
import { ApigeeApiToolComponent } from './apigee-api-tool/apigee-api-tool.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TargetServerModalComponent } from './apigee-api-tool/target-server-modal/target-server-modal.component';

const COMPONENTS = [
  ApiApiToolsComponent,
  ApigeeApiToolComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    NgSelectModule
  ],
  declarations: [
    ...COMPONENTS,
    TargetServerModalComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  exports : [
    ...COMPONENTS
  ]
})
export class ApiApiToolsModule { }
