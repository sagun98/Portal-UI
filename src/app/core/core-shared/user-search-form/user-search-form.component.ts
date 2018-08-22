import { PortalUser } from '../../interfaces/fr-user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss']
})
export class UserSearchFormComponent implements OnInit {

  @Input() username : string = '';
  @Input() validateUser;
  @Output() onSubmit : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onValidationFailed : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onNoResults :  EventEmitter<string> = new EventEmitter<string>();
  @Output() onResults : EventEmitter<PortalUser> = new EventEmitter<PortalUser>();

  public form : FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      username : [this.username, [Validators.required]]
    });
  }

  public handleSubmit () {
    if(this.form.invalid)
      return;

    const username = this.form.get('username').value.toUpperCase();

    if(this.validateUser && ! this.validateUser(username)){
      this.onValidationFailed.emit(true);
      return;
    }

    this.userService.getUserById(username).subscribe( (user : PortalUser) => {
      if(! user ){
        this.onNoResults.emit(username);
        return;
      }

      this.form.get('username').setValue('');

      this.onResults.emit(user);
    });
  }

}
