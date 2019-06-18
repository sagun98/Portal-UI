import { LoadingInterceptorService } from './core/loading-interceptor/loading-interceptor.service';
import { environment } from '../environments/environment';
import { PermissionsService } from './core/services/permissions/permissions.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService, FailedNavigation, FAILED_NAVIGATION_TYPE } from './core/services/user/user.service';
import { HttpErrorMessage } from './core/interfaces/http-error.interface';
import { Component, OnInit } from '@angular/core';
import { HttpErrorsService } from './core/services/http-errors/http-errors.service';
import { ToastrService } from 'ngx-toastr';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';
import { MycloudService } from './core/services/mycloud/mycloud.service';

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
    private mycloudService : MycloudService,
    private router : Router
  ){}

  ngOnInit(){

    this.userService.$loggedIn.subscribe(loggedIn => {
      if(loggedIn && ! this.userService.staticUser){
        this.userService.user.subscribe(user => { 
          console.log("HERE");
        });
      }
      else if(loggedIn == false && ! this.userService.staticUser && this.mycloudService.env != "LOCAL") {
        window.location.href = this.mycloudService.myCloudLoginUrl;
      }
    });

    setTimeout(t => {
      // Communicate with the forum to handle navigation
      window.addEventListener("message", (message) => {
        if(message.data === "loaded")
          return;
          
        if ((message.origin.indexOf(environment.forumBase) >= 0) || (environment.forumBase.indexOf(message.origin) >= 0)) {
          const pattern = new RegExp(`(${environment.forumBase}|${environment.restBase})`, 'gi');

          if(message.data.url){
            const path = message.data.url.replace(pattern, '');

            if(path.indexOf('http') === -1)
              this.router.navigate([`forum/${path}`]);
          }
        }
      }, false);

      this.userService.setLoggedInState();

      this.permissionsService.onForbiddenRouteAttempt.subscribe( (route : ActivatedRouteSnapshot) => {
        alert('You have attempted to access a forbidden resource');
        // this.router.navigate([`/home`]);
      });

      this.userService.$onUnAuthenticatedNavigationAttempt.pipe(debounce(() => timer(100))).subscribe( (failedNav : FailedNavigation) => {

        if(! failedNav)
          return;

        const type = failedNav.type

        this.userService.attemptedUrl = failedNav.attemptedUrl;

        if(type === FAILED_NAVIGATION_TYPE.LOGOUT)
          this.router.navigate([`/`]).then(navigated => {
          });

        if(type === FAILED_NAVIGATION_TYPE.NAVIGATION ) {
          this.router.navigate([`/`]).then(navigated => {
              alert('You need to be logged in to view this content.');

              if(this.mycloudService.env === "LOCAL"){
                this.showLogin = false;
                setTimeout(t => { this.showLogin = true; })
              } else {
                window.location.href = this.mycloudService.myCloudLoginUrl
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
            if (error.response.status === 401 && (error.response.status === 401 && this.isAuthenticationEndpoint(error.response.url) ) ) {
              this.userService.staticLogout();
              this.loadingInterceptorService.closeOpenRequest();
            }

            // Usually a CORS failure associated with a stale pearsonssosession token
            else if (error.response.status === 0 || (error.response.status === 401 && ! this.isAuthenticationEndpoint(error.response.url) )) {
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

  private isAuthenticationEndpoint (url: string) :boolean {
    if(! url)
      return false;

    return  /(api\/user|authenticate)/.test(url);
  }
}
