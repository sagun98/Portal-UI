import { ERROR_CLASSES } from '../../../../core/constants/error-classes.constant';
import { ApiManagementTool, DefaultApiManagementTool } from '../../../../core/interfaces/api-management-tool.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { API_MANAGEMENT_TOOLS } from '../../../../core/enums/api-management-tools.enum';
import { Product } from '../../interfaces/product.interface';
import { isNull } from 'util';
import { API_MANAGEMENT_TOOLS_ARRAY } from '../../../../core/constants/api-tools.constants';

@Component({
  selector: 'product-api-tools',
  templateUrl: './product-api-tools.component.html',
  styleUrls: ['./product-api-tools.component.scss']
})
export class ProductApiToolsComponent implements OnInit {
  @Input() product : Product;
  @Input() submitted: boolean = false;
  @Input('form') parentForm: FormGroup;

  public form: FormGroup;
  public API_MANAGEMENT_TOOLS = API_MANAGEMENT_TOOLS;
  public apiManagementTools: any[] = [ {label : 'None', value : null}, ...API_MANAGEMENT_TOOLS_ARRAY];
  public errorClasses = ERROR_CLASSES;
  private apiTool: ApiManagementTool = DefaultApiManagementTool;

  constructor(
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.apiTool = this.product.apiManagementTool || DefaultApiManagementTool;
    
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
      if( isNull( name ) || name == 'null')
        this.parentForm.removeControl('apiManagementTool');
      
      else
        this.parentForm.addControl('apiManagementTool', this.form);
    });
  }

}
