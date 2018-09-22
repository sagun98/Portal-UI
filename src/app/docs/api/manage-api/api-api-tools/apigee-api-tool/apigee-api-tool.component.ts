import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DefaultApigeeApiTool, ApigeeApiTool } from '../../../../../core/interfaces/apigee-api-tool.interface';
import { ERROR_CLASSES } from '../../../../../core/constants/error-classes.constant';
import { ApigeeClientService } from '../../../../../core/services/apigee-client/apigee-client.service';
import { APIGEE_ORGS } from '../../../../../core/constants/apigee-orgs.constant';

@Component({
  selector: 'apigee-api-tool',
  templateUrl: './apigee-api-tool.component.html',
  styleUrls: ['./apigee-api-tool.component.scss']
})
export class ApigeeApiToolComponent implements OnInit {
  @Input() apigeeTool: ApigeeApiTool = DefaultApigeeApiTool;
  @Input() submitted: boolean = false;
  @Input('form') parentForm: FormGroup;
  
  public form : FormGroup;
  public errorClasses = ERROR_CLASSES;
  public apis: string[] = [];
  public orgs = ['none', ...APIGEE_ORGS];

  constructor(
    private apigeeClient : ApigeeClientService
  ) { }
  
  ngOnInit() {
    this.apigeeTool = (this.apigeeTool.id) ? this.apigeeTool : DefaultApigeeApiTool;

    if(this.apigeeTool.org.length)
      this.getApis(this.apigeeTool.org);

    this.buildForm();

    this.handleOrgSelection();
  }

  private buildForm () : void {
    this.form = <FormGroup> this.parentForm;
    this.form.addControl('org', new FormControl(this.apigeeTool.org, [Validators.required]));
    this.form.addControl('id', new FormControl(this.apigeeTool.id, [Validators.required]));
  }

  private handleOrgSelection () : void {
    this.form.get('org').valueChanges.subscribe(org => {
      if(! org.length)
        return;

      this.getApis(org);
    });
  }

  private getApis (org: string) : void {
    this.apigeeClient.getApigeeApis(org).subscribe(
      apis => {
        this.apis = ['Select an API', ...apis];
      },
      error => {
        this.apis = [];
      }
    );
  }

}
