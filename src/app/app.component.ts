import { Router } from '@angular/router';
import { UserService } from './core/services/user/user.service';
import { HttpErrorMessage } from './core/interfaces/http-error.interface';
import { Component, OnInit } from '@angular/core';
import { ErrorInterceptor } from './core/interceptors/errors.interceptor';
import { HttpErrorsService } from './core/services/http-errors/http-errors.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { isNull } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public showLogin: boolean = false;

  constructor(
    private httpErrorsServices : HttpErrorsService,
    private toastrService : ToastrService,
    private userService: UserService,
    private router : Router
  ){}

  ngOnInit(){

    this.userService.$loggedIn.subscribe(loggedIn => {
      if(loggedIn && ! this.userService.staticUser){
        this.userService.user.subscribe(user => { });
      }
    });

    setTimeout(t => {

      this.userService.setLoggedInState();

      this.userService.$onUnAuthenticatedNavigationAttempt.subscribe(t => {
        if( ! isNull(t) ){
          
          this.router.navigate([`/home`]).then(navigated => {
            if( isNull(navigated) ){
              alert('You need to be logged in to view this content.');
              this.showLogin = false;
              setTimeout(t => { this.showLogin = true; })
            }
          });
        }
      });

      this.userService.$doUserLogin.subscribe(doLogin => {
        this.showLogin = doLogin;
      });

      this.httpErrorsServices.$onError.subscribe( (errors: HttpErrorMessage[]) => {
        errors.forEach( (error: HttpErrorMessage) => {
          setTimeout(t => {
            if(! this.httpErrorsServices.override)
              this.toastrService[error.type ](error.title, error.message);
            
            else
              this.httpErrorsServices.override = false;
          });
        });
      });

    });
  }

}
