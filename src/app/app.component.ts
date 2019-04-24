import { LoadingInterceptorService } from './core/loading-interceptor/loading-interceptor.service';
import { environment } from '../environments/environment';
import { PermissionsService } from './core/services/permissions/permissions.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService, FailedNavigation, FAILED_NAVIGATION_TYPE } from './core/services/user/user.service';
import { HttpErrorMessage } from './core/interfaces/http-error.interface';
import { Component, OnInit } from '@angular/core';
import { HttpErrorsService } from './core/services/http-errors/http-errors.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public showLogin: boolean = false;

  constructor(
    private httpErrorsServices : HttpErrorsService,
    private toastrService : ToastrService,
    private userService: UserService,
    private loadingInterceptorService: LoadingInterceptorService,
    private permissionsService : PermissionsService,
    private router : Router
  ){}

  ngOnInit(){
    this.userService.$loggedIn.subscribe(loggedIn => {
      if(loggedIn && ! this.userService.staticUser){
        this.userService.user.subscribe(user => { });
      }
    });

    setTimeout(t => {

      // Communicate with the forum to handle navigation
      window.addEventListener("message", (message) => {
        if(message.data === "loaded")
          return;
          
        if(message.origin.indexOf(environment.forumBase) >= 0){
          const pattern = new RegExp(`(${environment.forumBase}|${environment.restBase})`, 'gi');
          const path = message.data.replace(pattern, '');

          if(path.indexOf('http') === -1)
            this.router.navigate([`forum${path}`]);
        }
      }, false);

      this.userService.setLoggedInState();

      this.permissionsService.onForbiddenRouteAttempt.subscribe( (route : ActivatedRouteSnapshot) => {
        alert('You have attempted to access a forbidden resource');
        // this.router.navigate([`/home`]);
      });

      this.userService.$onUnAuthenticatedNavigationAttempt.subscribe( (failedNav : FailedNavigation) => {
        if(! failedNav)
          return;

        const type = failedNav.type

        this.userService.attemptedUrl = failedNav.attemptedUrl;

        if(type === FAILED_NAVIGATION_TYPE.LOGOUT)
          this.router.navigate([`/`]).then(navigated => {
            console.log("navigated? ", navigated);
          });

        if(type === FAILED_NAVIGATION_TYPE.NAVIGATION ) {
          this.router.navigate([`/`]).then(navigated => {
            // if( isNull(navigated) ){
              alert('You need to be logged in to view this content.');
              this.showLogin = false;
              setTimeout(t => { this.showLogin = true; })
            // }
          });
        }
      });

      this.userService.$doUserLogin.subscribe(doLogin => {
        this.showLogin = doLogin;
      });

      this.httpErrorsServices.$onError.subscribe( (errors: HttpErrorMessage[]) => {
        errors.forEach( (error: HttpErrorMessage) => {
          setTimeout(t => {
            if (error.response.status === 401 && error.response.url.indexOf("api/user") === -1 )
              this.userService.staticLogout();

            // Usually a CORS failure associated with a stale pearsonssosession token
            else if (error.response.status === 0 || (error.response.status === 401 && error.response.url.indexOf("api/user") != -1 )) {
              this.userService.staticLogout();
              this.toastrService.error('Oops... It looks like your session timed out.  Please log back in to continue.');
              this.showLogin = false;
              setTimeout(t => { this.showLogin = true; })
              this.loadingInterceptorService.closeOpenRequest();
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
