import { Router } from '@angular/router';
import { UserService, FailedNavigation, FAILED_NAVIGATION_TYPE } from './core/services/user/user.service';
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

      this.userService.$onUnAuthenticatedNavigationAttempt.subscribe( (failedNav : FailedNavigation) => {
        if(! failedNav)
          return;

        const type = failedNav.type

        this.userService.attemptedUrl = failedNav.attemptedUrl;

        if(type === FAILED_NAVIGATION_TYPE.LOGOUT)
          this.router.navigate([`/home`]);

        if(type === FAILED_NAVIGATION_TYPE.NAVIGATION ){
          
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
            //  if(/\/user$/.test( error.response.url) && error.response.status === 403){
            if(error.response.status === 401){
              this.userService.staticLogout();
            }

            else if(! this.httpErrorsServices.override)
              this.toastrService[error.type ](error.title, error.message);
            
            else
              this.httpErrorsServices.override = false;
          });
        });
      });

    });
  }

}
