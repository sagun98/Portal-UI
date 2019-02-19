import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required]}),
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]})
    });
  }

  onSaveUser() {
    if (this.userForm.invalid) { return; }
    this.userService.createUser(this.userForm.value.username, this.userForm.value.firstName, this.userForm.value.lastName, this.userForm.value.email)
      .subscribe(result => {
        this.router.navigate(['users']);
      });
  }
}
