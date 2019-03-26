import { ToastrService } from 'ngx-toastr';
import { EmailService } from './../../services/email/email.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ERROR_CLASSES } from '../../constants/error-classes.constant';
import { TINYCMCE_CONFIG } from '../../../docs/constants/tinymce.constant';
import { Email } from '../../interfaces/email.interface';
import { LoadingInterceptorService } from '../../loading-interceptor/loading-interceptor.service';

@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public errorClasses = ERROR_CLASSES;
  public tinymceConfig = TINYCMCE_CONFIG;
  public form: FormGroup;
  public submitted: boolean = false;
  public email: Email;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private toastrService: ToastrService,
    private loadingService: LoadingInterceptorService
  ) { }

  ngOnInit() {
    this.buildForm();

    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 250, save_onsavecallback: () => { } });
  }

  private buildForm () : void {
    this.form = this.formBuilder.group({
      subject : ['', Validators.required],
      body : [' ', Validators.required]
    });
  }

  public sendEmail () : void {
    this.email = <Email> this.form.getRawValue();
    this.submitted = true;

    if(this.form.invalid)
      return;

    this.loadingService.addOpenRequest(1);
    this.emailService.sendEmail(this.email).subscribe(sent => {
      this.loadingService.closeOpenRequest(1);
      this.toastrService.success('Your Email has been sent.');
    }, error => {
      this.toastrService.error('Unable to send this email');
    });
  }
}
