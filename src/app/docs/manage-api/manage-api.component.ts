import { SubNavigationComponent } from './../../core/layouts/sub-navigation/sub-navigation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ProxyService } from '../api/proxy.service';
import { ERROR_CLASSES } from '../../core/constants/error-classes.constant';
import { TINYCMCE_CONFIG } from '../constants/tinymce.constant';
import { DevPortalAPI } from '../api/api.model';

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

  constructor(
    private formBuilder : FormBuilder,
    private proxyService : ProxyService,
    private activatedRoute: ActivatedRoute,
    private router : Router
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
      // TODO: remove _
      id : [this.api['_id'], []],
      revision : [this.api.revision, []],
      name : [this.api.name, [Validators.required]],
      description : [this.api.description, [Validators.required]],
      overview : [this.api.overview, []],
      gettingStarted : [this.api.gettingStarted, []],
      reference : [this.api.reference, []],
      swagger : [this.api.swagger, [Validators.required]]
    });
  }

  public saveApi () {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    const apiData = this.form.getRawValue();

    this.proxyService[this.saveMethod](apiData).subscribe( (api: DevPortalAPI) => {
      // TODO: remove this hack
      api.id = api['_id'];

      this.router.navigate([`/docs/api/${api.id}`]);
    })
  }

}