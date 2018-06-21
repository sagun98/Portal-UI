import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorsService } from './../../../services/http-errors/http-errors.service';
import { UserService, FRCredentials } from './../../../services/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

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
            this.router.navigate([ this.userService.attemptedUrl ]);
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