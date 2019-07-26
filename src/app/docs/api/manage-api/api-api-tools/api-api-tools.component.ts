import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DefaultApiManagementTool, ApiManagementTool } from '../../../../core/interfaces/api-management-tool.interface';
import { API_MANAGEMENT_TOOLS } from '../../../../core/enums/api-management-tools.enum';
import { API_MANAGEMENT_TOOLS_ARRAY } from '../../../../core/constants/api-tools.constants';
import { ERROR_CLASSES } from '../../../../core/constants/error-classes.constant';
import { isNull } from 'util';
import { APIGEE_ORGS } from '../../../../core/constants/apigee-orgs.constant';
import { API } from '../../../../core/interfaces/api.interface';

@Component({
  selector: 'api-api-tools',
  templateUrl: './api-api-tools.component.html',
  styleUrls: ['./api-api-tools.component.scss']
})
export class ApiApiToolsComponent implements OnInit {
  @Input() api : API;
  @Input() submitted: boolean = false;
  @Input('form') parentForm: FormGroup;

  public form: FormGroup;
  public API_MANAGEMENT_TOOLS = API_MANAGEMENT_TOOLS;
  public apiManagementTools: any[] = [ {label : 'None', value : null}, ...API_MANAGEMENT_TOOLS_ARRAY];
  public errorClasses = ERROR_CLASSES;
  public orgs = ['none', ...APIGEE_ORGS];
  private apiTool: ApiManagementTool = DefaultApiManagementTool;

  constructor(
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.apiTool = this.api.apiManagementTool || DefaultApiManagementTool;
    
    this.buildForm();

    this.handleNameChange();

    if(this.apiTool && this.apiTool.name && this.apiTool.name.length)
      this.parentForm.addControl('apiManagementTool', this.form);
  }

  private buildForm () : void {
    this.form = this.formBuilder.group({
      name : [this.apiTool.name]
    });
  }

  private handleNameChange () : void {
    this.form.get('name').valueChanges.subscribe(name => {
      if( isNull( name ) || ! name ) {
        this.parentForm.removeControl('apiManagementTool');
        this.form.get('name').setValue(null, {
          selfOnly : true,
          emitEvent : false
        });
      }
      
      else {
        this.parentForm.addControl('apiManagementTool', this.form);
        this.form.controls.name.setValue(API_MANAGEMENT_TOOLS.APIGEE, {
          selfOnly : true,
          emitEvent : false
        });
      }
    });
  }

}
