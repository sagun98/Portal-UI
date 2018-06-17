import { UserService, FRCredentials } from './../../../services/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  @Input() opened: boolean = false;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modalIsOpen = changes.opened.currentValue;

    if(modalIsOpen)
      this.form.reset();
  }

  public authenticate () {
    const creds = <FRCredentials> this.form.getRawValue();

    this.userService.authenticate(creds).subscribe(response => {
      this.userService.getUser().subscribe(user => {
        this.userService.$doUserLogin.next( false );
      });
    });
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