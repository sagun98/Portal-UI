import { APIGEE_KEY_DURATIONS } from './../../../../../core/constants/apigee-key-durations.constant';
import { LabelValuePair } from './../../../../../core/interfaces/label-value-pair.interface';
import { ApigeeClientService } from '../../../../../core/services/apigee-client/apigee-client.service';
import { APIGEE_ORGS } from '../../../../../core/constants/apigee-orgs.constant';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ApigeeManagementTool, DefaultApigeeManagementTool } from '../../../../../core/interfaces/apigee-management-tool.interface';
import { ERROR_CLASSES } from '../../../../../core/constants/error-classes.constant';

@Component({
  selector: 'apigee-management-form',
  templateUrl: './apigee-management-form.component.html',
  styleUrls: ['./apigee-management-form.component.scss']
})
export class ApigeeManagementFormComponent implements OnInit {
  @Input() apigeeTool: ApigeeManagementTool = DefaultApigeeManagementTool;
  @Input() submitted: boolean = false;
  @Input('form') parentForm: FormGroup;
  public form : FormGroup;

  public errorClasses = ERROR_CLASSES;
  public orgs = ['none', ...APIGEE_ORGS];
  public products: string[] = [];
  public durations: LabelValuePair[] = APIGEE_KEY_DURATIONS;

  constructor(
    private formBuilder : FormBuilder,
    private apigeeClient : ApigeeClientService
  ) { }

  ngOnInit() {
    this.apigeeTool = (this.apigeeTool.id) ? this.apigeeTool : DefaultApigeeManagementTool;

    if(this.apigeeTool.org.length)
      this.getProducts(this.apigeeTool.org);

    this.buildForm();

    this.handleOrgSelection();
  }

  private buildForm () : void {
    this.form = <FormGroup> this.parentForm;
    this.form.addControl('id', new FormControl(this.apigeeTool.id, [Validators.required]));
    this.form.addControl('duration', new FormControl(this.apigeeTool.duration, [Validators.required]));
    this.form.addControl('org', new FormControl(this.apigeeTool.org, [Validators.required]));
  }

  private handleOrgSelection () : void {
    this.form.get('org').valueChanges.subscribe(org => {
      if(! org.length)
        return;

      this.getProducts(org);
    });
  }

  private getProducts (org) : void {
    this.apigeeClient.getApigeeProducts(org).subscribe(
      products => {
        this.products = ['Select a Product', ...products];
      },
      error => {
        this.products = [];
      }
    );
  }
}
