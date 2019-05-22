import { HttpErrorsService } from './../../core/services/http-errors/http-errors.service';
import { APIRequest } from './../../core/interfaces/api-request.interface';
import { FeedbackService } from './../../core/services/feedback/feedback.service';
import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortalUser } from '../../core/interfaces/fr-user.interface';
import { ClrModal } from '@clr/angular';
import { ERROR_CLASSES } from '../../core/constants/error-classes.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'request-api-modal',
  templateUrl: './request-api-modal.component.html',
  styleUrls: ['./request-api-modal.component.scss']
})
export class RequestApiModalComponent implements OnInit {

  @Input() requestApiModalOpened: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(ClrModal) clrModal: ClrModal;

  public form: FormGroup;
  public email : string;
  public submitted: boolean = false;
  public errorClasses = ERROR_CLASSES;

  constructor(
    private formBuilder : FormBuilder,
    private userService: UserService,
    private feedbackService: FeedbackService,
    private httpErrorsService : HttpErrorsService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.clrModal._openChanged.subscribe(opened => {
      this.onClose.emit(opened);
    })

    this.userService.user.subscribe( (user: PortalUser) => {
      this.email = user.email;

      this.buildForm();
    });
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      name : ['', [Validators.required]],
      email : [this.email, [Validators.required]],
      collection: [''],
      details : ['']
    });
  }

  public sendApiRequest () {
    console.log( this.form.getRawValue() );

    this.submitted = true;

    if(this.form.invalid)
      return;

    let apiRequest: APIRequest = <APIRequest> this.form.getRawValue();

    this.feedbackService.sendAPIRequest(apiRequest).subscribe(
      response => {
        this.toastrService.success(`Your request to add the ${apiRequest.name} API has been sent.`);
        this.onClose.emit(false);
      },
      error => {
        this.httpErrorsService.override = true;
        this.toastrService.error(`Your request to add an API has failed.  Please try again.`);
      }
    )
  }
}