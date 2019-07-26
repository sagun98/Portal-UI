import { API_MANAGEMENT_TOOLS } from '../../../../../core/enums/api-management-tools.enum';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// tslint:disble
import { async, TestBed } from '@angular/core/testing';

import {ApigeeApiToolComponent} from './apigee-api-tool.component';
import {ApigeeClientService, MockApigeeClientService} from '../../../../../core/services/apigee-client/apigee-client.service';
import { ApigeeApiTool } from '../../../../../core/interfaces/apigee-api-tool.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
      
describe('ApigeeApiToolComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule
      ],
      declarations: [
        ApigeeApiToolComponent
      ],
      providers: [
        HttpClient,
        {provide: ApigeeClientService, useClass: MockApigeeClientService, deps : [HttpClient]},
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ApigeeApiToolComponent);
    component = fixture.debugElement.componentInstance;

    component.apigeeTool = <ApigeeApiTool> {
      name : API_MANAGEMENT_TOOLS.APIGEE,
      id : 'Proxy 1',
      org : component.orgs[1]
    };

    component.parentForm = new FormGroup({
      name : new FormControl(component.apigeeTool.name, [Validators.required])
    });

    fixture.detectChanges();
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnInit()', async(() => {
    component.ngOnInit();
    expect(component.form.get('name').value).toEqual(component.apigeeTool.name);
    expect(component.form.get('id').value).toEqual(component.apigeeTool.id);
    expect(component.form.get('org').value).toEqual(component.apigeeTool.org);
  }));
        
  it('should run #buildForm()', async(() => {
    expect( Object.keys( component.form.controls ).length ).toEqual(6);
  }));        
});