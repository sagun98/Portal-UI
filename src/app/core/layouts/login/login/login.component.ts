import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorsService } from '../../../services/http-errors/http-errors.service';
import { UserService, FRCredentials } from '../../../services/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Angulartics2GoogleGlobalSiteTagOverride } from '../../../../shared/angulartics-2-google-global-site-tag-override.service';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  @Input() opened: boolean = false;

  public form: FormGroup;
  public authFailed: boolean = false;

  constructor(
    private angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTagOverride,
    private formBuilder: FormBuilder,
    private errorService: HttpErrorsService,
    private userService : UserService,
    private router : Router,
    private toastrService : ToastrService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modalIsOpen = changes.opened.currentValue;

    if(modalIsOpen) {
      this.form.reset();
      this.authFailed = false;

      setTimeout(t => {
        const username = <HTMLElement> document.querySelector("#username");
        username.focus();
      }, 500);

    }
  }

  public authenticate () {
    const creds = <FRCredentials> this.form.getRawValue();

    this.userService.authenticate(creds)
      .subscribe(
        response => {
          this.userService.getUser().subscribe(user => {
            this.authFailed = false;
            this.userService.$doUserLogin.next( false );
            this.toastrService.success(`Sucessfully logged in as:  ${creds.username}`, null, <ToastrConfig> {
              "timeOut" : 1500
            });

            window['gtag']('config', 'UA-123646740-1', {'custom_map': {'dimension1': 'username'}});

            this.angulartics2GoogleGlobalSiteTag.eventTrack('login', {
              category : 'userAction',
              label : `login`,
              value : 0,
              gstCustom : { username : user.username }
            });

            const where = (this.userService.attemptedUrl.length) ? this.userService.attemptedUrl : '/documentation/main';
            this.router.navigate([ where ]);
          }
        )},
        errorResponse => {
          this.errorService.override = true;
          this.authFailed = true;
          this.toastrService.error('Username / Password combination provided was invalid.', 'Authentication Failed' );
        }
    )
  }

  public closeModal () {
    this.userService.$doUserLogin.next(false);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username : [],
      password : []
    });
  }

}