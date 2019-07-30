import { ApigeeVirtualHost } from './../../../../../core/interfaces/apigee-virtualhost.interface';
import { ApigeeTargetServer } from './../../../../../core/interfaces/apigee-targetserver.interface';
import { API } from './../../../../../core/interfaces/api.interface';
import { ApigeeEnvironment } from './../../../../../core/interfaces/apigee-environment.interface';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DefaultApigeeApiTool, ApigeeApiTool } from '../../../../../core/interfaces/apigee-api-tool.interface';
import { ERROR_CLASSES } from '../../../../../core/constants/error-classes.constant';
import { ApigeeClientService } from '../../../../../core/services/apigee-client/apigee-client.service';
import { APIGEE_ORGS } from '../../../../../core/constants/apigee-orgs.constant';
import { debounce, map } from 'rxjs/operators';
import { timer } from 'rxjs';
import { DevPortalProxy } from 'src/app/core/interfaces/dev-portal-proxy.interface';

@Component({
  selector: 'apigee-api-tool',
  templateUrl: './apigee-api-tool.component.html',
  styleUrls: ['./apigee-api-tool.component.scss']
})
export class ApigeeApiToolComponent implements OnInit {
  @Input() api: API;
  @Input() apigeeTool: ApigeeApiTool = DefaultApigeeApiTool;
  @Input() submitted: boolean = false;
  @Input('form') parentForm: FormGroup;
  
  public form : FormGroup;
  public errorClasses = ERROR_CLASSES;
  public apis: string[] = [];
  public environments : ApigeeEnvironment[];
  public orgs = ['none', ...APIGEE_ORGS];
  public revisions: number[] = [];
  public isExistingProxy: boolean = true;
  public basePaths: FormArray;
  public targetServersFormArray: FormArray;
  public configuredTargetServers: any[];
  private debounceTimeout: number = 100;
  private targetServers: ApigeeTargetServer[] = [];
  private virtualHosts: ApigeeVirtualHost[] = [];
  private defaultVirtualHost: ApigeeVirtualHost = null;
  private openTargetServerModal: boolean = false;
  public newTargetServerModalOpened: boolean;
  public newTargetServer : ApigeeTargetServer;
  public currentTargetServer: FormGroup;

  constructor(
    private apigeeClient : ApigeeClientService,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit() {
    this.apigeeTool = (this.apigeeTool.id) ? this.apigeeTool : DefaultApigeeApiTool;
    // this.isExistingProxy = (this.apigeeTool.id) ? true : false;

    if(this.apigeeTool.org.length)
      this.getApis(this.apigeeTool.org);

    this.buildForm();

    this.handleOrgSelection();

    this.handleProxySelection();

    this.handleExistingProxyChange ();

    setTimeout(t => {
      this.form.get('org').setValue(APIGEE_ORGS[0]);
    },0);

  }

  private buildForm () : void {
    this.form = <FormGroup> this.parentForm;
    this.form.addControl('org', new FormControl(this.apigeeTool.org, [Validators.required]));
    this.form.addControl('environment', new FormControl('dev', [Validators.required]));
    this.form.addControl('id', new FormControl(this.apigeeTool.id, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]));
    // this.form.addControl('revision', new FormControl(this.apigeeTool.revision, [Validators.required]));
    this.form.addControl('basePaths', new FormArray([]));
    this.form.addControl('targetServers', new FormArray([]));
    
    this.addBasePath();
    this.addTargetServer();
  }

  public createProxyEndpoint(): FormGroup {
    let proxyEndpointArray = this.form.controls.targetServers as FormArray;
    let defaultValue = (! proxyEndpointArray.controls.length) ? 'default' : '';

    let group = this.formBuilder.group({
      name : [defaultValue, [Validators.required]], 
      path : ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^\//)]], 
      targetServer : [null, [Validators.required]],
    });
    
    group.controls.name.valueChanges.pipe(debounce(() => timer(this.debounceTimeout))).subscribe(name => {
      this.formatPathValue(group.controls.name, name);
      this.scrubEnvironments(group.controls.name, name);
      this.preventDuplicates(this.form.controls.basePaths, group.controls.name, name);
    });

    group.controls.path.valueChanges.pipe(debounce(() => timer(this.debounceTimeout))).subscribe(path => {
      this.formatPathValue(group.controls.path, path);
      this.preventDuplicates(this.form.controls.basePaths, group.controls.path, path);
    });

    return group;
  }

  public createTargetServer(): FormGroup {
    let targetServerArray = this.form.controls.targetServers as FormArray;
    let defaultValue = (! targetServerArray.controls.length) ? 'default' : '';

    let group = this.formBuilder.group({
      name : [defaultValue, [Validators.required]], 
      targetServer : [null, [Validators.required]],
      targetServerPath : ['', [Validators.minLength(2), Validators.pattern(/^\//)]]
    });
    
    group.controls.name.valueChanges.pipe(debounce(() => timer(this.debounceTimeout))).subscribe(name => {
      this.formatPathValue(group.controls.name, name);
      this.scrubEnvironments(group.controls.name, name);
      this.preventDuplicates(this.form.controls.targetServers, group.controls.name, name);
    });

    group.controls.targetServer.valueChanges.pipe(debounce(() => timer(this.debounceTimeout))).subscribe(path => {
      if(! path)
        return;

      this.preventDuplicates(this.form.controls.targetServers, group.controls.targetServer, path);
    });

    group.controls.targetServerPath.valueChanges.pipe(debounce(() => timer(this.debounceTimeout))).subscribe(path => {
        this.formatPathValue(group.controls.targetServerPath, path);
    });

    return group;
  }

  private preventDuplicates (basePaths: AbstractControl, _control: AbstractControl, value: string) : void {
    let formArray = basePaths as FormArray;
    let control = _control as FormControl;
    let controlName = Object.keys(_control.parent.controls).filter(_controlName => {
      let control = _control.parent.controls[_controlName];
      return control == _control;
    })[0];

    if(formArray.length <= 1)
      return;

    let values: any[] = formArray.controls.filter( (filterControl : FormGroup) => {
      return (filterControl.controls[controlName] !== control);
    }).map( (control: FormGroup) => {
      return control.controls[controlName].value;
    });

    let isDuplicate: boolean = (values.includes(value));

    let errors = control.errors;

    if(isDuplicate)
      control.setErrors({duplicate : true})
    else if(errors) {
      delete errors.duplicate;
      control.setErrors(errors);
    }

    formArray.controls.forEach((_group : FormGroup) => {
      if(_group.controls[controlName] !== control)
        _group.controls[controlName].updateValueAndValidity({onlySelf : true, emitEvent : false});
    });
  }

  private formatPathValue (control: AbstractControl, path: string) : void {
    path = path.replace(/\s/gi, "-");
    path = path.replace(/[^\/A-Za-z0-9\-\_]/gi, "");
    control.setValue(path, {onlySelf : true, emitEvent : false});
  }

  private scrubEnvironments (control: AbstractControl, path: string) : void {
    path = path.replace(/\-(dev|test|tst|stg|stage|qa|prod|nft)/gi, "");
    control.setValue(path, {onlySelf : true, emitEvent : false});
  }

  public addBasePath () : void {
    this.basePaths = this.form.get('basePaths') as FormArray;
    this.basePaths.push(this.createProxyEndpoint());

    setTimeout(t => {
      let nodeList = document.querySelectorAll(".pathname");
      if(nodeList.length){
        let focusElement = nodeList[nodeList.length - 1] as HTMLElement;
        focusElement.focus();
      }
    }, 0);
  }

  public addTargetServer () : void {
    this.targetServersFormArray = this.form.get('targetServers') as FormArray;
    this.targetServersFormArray.push(this.createTargetServer());
    this.targetServersFormArray.controls = [...this.targetServersFormArray.controls];
  
    setTimeout(t => {
      let nodeList = document.querySelectorAll(".targetServerName");
      if(nodeList.length){
        let focusElement = nodeList[nodeList.length - 1] as HTMLElement;
        focusElement.focus();
      }
    }, 0);
  }

  public removeBasePath(index : number) : void {
    if(this.basePaths.length > 1) {
      this.basePaths.removeAt(index);
      this.disableSelectedTargetServer();
    }
    else
      alert("At least one Proxy Endpoint is required.");
  }

  public removeTargetServer(index : number) : void {
    if(this.targetServersFormArray.length > 1) {
      this.targetServersFormArray.removeAt(index);
      this.targetServersFormArray.controls = [...this.targetServersFormArray.controls];
    }
    else
      alert("At least one Target Server is required.");
  }

  public handleExistingProxyChange () {
    if(this.isExistingProxy) {
      //this.form.get('environment').enable();
      //this.form.removeControl('basePaths');
      this.form.controls.basePaths.disable();
      this.form.controls.targetServers.disable();
    } else {
      // this.form.addControl('basePaths', new FormArray([]));
      // this.addBasePath();
      this.form.controls.basePaths.enable();
      this.form.controls.targetServers.enable();
    }
  }

  public createNewTargetServer (potentialNewTargetServer: ApigeeTargetServer, targetServerFormGroup: FormGroup) : void {
    this.newTargetServerModalOpened = false;

    // if(potentialNewTargetServer == null)
    if(targetServerFormGroup.controls.targetServer.value == null && potentialNewTargetServer == null)
      return;

    if( ! this.targetServers.includes(potentialNewTargetServer) || potentialNewTargetServer == null) {
      potentialNewTargetServer = potentialNewTargetServer || targetServerFormGroup.controls.targetServer.value;
      this.newTargetServer = potentialNewTargetServer;
      this.currentTargetServer = targetServerFormGroup;
      setTimeout(t=>{this.newTargetServerModalOpened = true;}, 0);
    }
  }

  public addNewTargetServer (newTargetServer: ApigeeTargetServer) {
    let rowIndex: number = this.targetServersFormArray.controls.indexOf(this.currentTargetServer) ;

    let row = document.querySelectorAll(".target-servers-row").item(rowIndex) as HTMLElement;

    let input = row.querySelector(".target-server-path-col input") as HTMLElement;

    setTimeout(t=>{input.focus();}, 250);

    if(this.targetServers.filter(t=>{return t.host === newTargetServer.host}).length == 0)
      this.targetServers = [newTargetServer, ...this.targetServers];
    else {
      this.targetServers = [newTargetServer, ...this.targetServers.filter(t =>{return t.host !== newTargetServer.host})];
    }

    this.currentTargetServer.controls.targetServer.setValue( newTargetServer );
  }

  public removeNewTargetServer (removeTargetServer : ApigeeTargetServer) : void {
    this.currentTargetServer.controls.targetServer.setValue( null );
    this.targetServers = [...this.targetServers];
  }

  get validTargetServerCount () : number {
    return this.targetServersFormArray.controls.filter( (fg : FormGroup) => {
      return fg.valid;
    }).length;
  }

  public disableSelectedTargetServer () {
    let targetServersObject = {};
    this.basePaths.controls.forEach( (fg: FormGroup) =>  {
      if(! fg.controls.targetServer.value)
        return;

      let targetServer = fg.controls.targetServer.value.value;
      if(targetServer)
        targetServersObject[targetServer.name] = true;
    });
    let targetServers = Object.keys(targetServersObject);
    
    this.targetServersFormArray.controls.forEach( (fg : FormGroup) => {
      fg['readonly'] = false;
      // fg.controls.targetServer.enable();
      targetServers.forEach(targetServer => {
        if (fg.controls.name.value == targetServer){
          fg['readonly'] = true;
          // fg.controls.targetServer.disable();
        }
      });
    });
  }

  public customSearchFn (term: string, item: FormGroup) : boolean {
    if(! term || ! item.controls.targetServer.value)
      return true;

    let itemValue:string = item.controls.targetServer.value.host + item.controls.name.value;

    return (itemValue.indexOf(term) >= 0);
  }

  public submitProxy () : void {
    let proxyObject: DevPortalProxy = this.form.getRawValue();
    let basePaths = Object.assign({}, this.form.controls.basePaths);

    proxyObject.basePaths = basePaths.value.map(fc => { 
      return {
        name : fc.name,
        path : fc.path,
        targetServer : fc.targetServer.value//.controls.targetServer.value
      };
    });

    this.apigeeClient.createProxy(proxyObject).subscribe(proxy => {
      console.log("proxy: ", proxy);
    });
    //this.apigeeClient.createProxy()
  }

  private handleProxySelection () : void{
    this.form.get('id').valueChanges.pipe(debounce(() => timer(this.debounceTimeout))).subscribe(proxy => {
      if(! proxy)
        return;

      proxy = proxy.replace(/\s/gi, "-");
      proxy = proxy.replace(/[^A-Za-z0-9\-\_]/gi, "");

      this.isExistingProxy = (this.apis.includes(proxy)) ? true : false;

      setTimeout(t => { this.form.get('id').setValue(proxy, {onlySelf : true, emitEvent : false}); }, 0);

      this.handleExistingProxyChange ();
    })
  }

  private handleOrgSelection () : void {
    this.form.get('org').valueChanges.subscribe(org => {
      if(! org.length){
        this.form.get('id').reset();
        // this.form.get('environment').reset();
        return;
      }

      // this.getEnvironments(org);
      this.getApis(org);
      this.getTargetServers(org, 'dev');
      this.getVirtualHosts(org, 'dev');
    });
  }

  private getVirtualHosts(org : string, environment : string) {
    this.apigeeClient.getVirtualHots(org, environment).subscribe(virtualHosts => {
      this.virtualHosts = virtualHosts;

      this.defaultVirtualHost = virtualHosts.filter(vh => {return (vh.name === "apipearsoncom")})[0];
    });
  }

  private getTargetServers (org: string, environment : string) : void {
    this.apigeeClient.getTargetServers(org, environment).subscribe(targetServers => {
      let prop = "host";
      targetServers = targetServers.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
      this.targetServers = targetServers;
    });
  }


  private getEnvironments(org : string) {
    this.apigeeClient.getEnvironments(org).subscribe(environments => {

      if(! this.api.version){
        this.environments = [{name : 'Select an Environment'}, ...environments];

        this.form.get('environment').disable();
        
        this.form.get('environment').setValue('dev', {
          onlySelf: true, 
          emitEvent : false
        });
      }

      this.environments = [{name : 'Select an Environment'}, ...environments];
    });
  }

  private getApis (org: string) : void {
    this.apigeeClient.getApigeeApis(org).subscribe(
      apis => {
        this.apis = apis;
      },
      error => {
        this.apis = [];
      }
    );
  }

}
