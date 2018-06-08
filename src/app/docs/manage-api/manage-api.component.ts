// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubNavigationComponent } from './../../core/layouts/sub-navigation/sub-navigation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ProxyService } from '../api/proxy.service';
import { ERROR_CLASSES } from '../../core/constants/error-classes.constant';
import { TINYCMCE_CONFIG } from '../constants/tinymce.constant';
import { DevPortalAPI } from '../api/api.model';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-manage-api',
  templateUrl: './manage-api.component.html',
  styleUrls: ['./manage-api.component.scss']
})
export class ManageApiComponent implements OnInit {

  @Input() api: DevPortalAPI = {name : null, description : null, overview : '', gettingStarted : '', reference : '', swagger : null};
  public errorClasses = ERROR_CLASSES;
  public form: FormGroup;
  public submitted: boolean = false;
  public tinymceConfig = TINYCMCE_CONFIG;
  public saveMethod: string = 'saveApi';

  public uploader:FileUploader = new FileUploader({url: ''});

  constructor(
    private formBuilder : FormBuilder,
    private proxyService : ProxyService,
    private activatedRoute: ActivatedRoute,
    private router : Router
    // private http : HttpClient
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.api = <DevPortalAPI> data.api || this.api;
      this.saveMethod = data.saveMethod || this.saveMethod;
    });

    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200, save_onsavecallback: () => { } });

    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id : [this.api.id, []],
      version : [this.api.version, []],
      name : [this.api.name, [Validators.required]],
      description : [this.api.description, [Validators.required]],
      overview : [this.api.overview, []],
      gettingStarted : [this.api.gettingStarted, []],
      reference : [this.api.reference, []],
      swagger : [this.api.swagger, [/* Validators.required */]]
    });
  }

  public saveApi () {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    const apiData = this.form.getRawValue();

    // let file: File = apiData.swagger;
    // let formData:FormData = new FormData();
    
    // formData.append('file', file, file.name);
    // formData.append('id', apiData.id);
    // formData.append('name', apiData.name);
    // formData.append('description', apiData.description);
    // formData.append('overview', apiData.overview);
    // formData.append('gettingStarted', apiData.gettingStarted);
    // formData.append('reference', apiData.reference);
    
    // let headers = new HttpHeaders()
    //                     .append('Content-Type', 'multipart/form-data')
    //                     .append('Accept', 'application/json');
    
    // this.http.post(`http://localhost:3000/api/v1/attachments?apikey=12345`, formData/*, { headers: headers }*/).subscribe(r => {
    //   console.log(r);
    // });


    this.proxyService[this.saveMethod](apiData).subscribe( (api: DevPortalAPI) => {
      this.router.navigate([`/docs/api/${api.id}`]);
    })
  }

  public dropped (event) {
    console.log(event);
  }

  public fileOver (event) {
    console.log(event);
  }

  public fileLeave (event) {
    console.log(event);
  }

  public handleUpload (event) {
    const file = event.target.files[0];

    console.log(file);

    this.form.get('swagger').setValue(file);
  }

}