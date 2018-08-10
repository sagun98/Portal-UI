import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { DevPortalCoreModule } from './core/core.module';
import { LoadingInterceptorModule } from './core/loading-interceptor/loading-interceptor.module';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { UserService, FailedNavigation, FAILED_NAVIGATION_TYPE } from './core/services/user/user.service';
import { HttpErrorsService } from './core/services/http-errors/http-errors.service';
import { HTTP_ERROR_TYPES } from './core/enums/http-error-types.enum';
import { RouterTestingModule } from '@angular/router/testing';
import { MockUserService } from './core/layouts/side-navigation/side-navigation.component.spec';
import { appRoutes } from './app.routes';
import { Router } from '@angular/router';

class MockHttpErrorsService extends HttpErrorsService {
  constructor () {
    super()
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        RouterTestingModule.withRoutes([
          {"component" : HomeComponent, "path" : "home"}
        ]),
        ToastrModule.forRoot(),
        FormsModule,
        LoadingInterceptorModule,
        DevPortalCoreModule,
        HttpClientModule,
        HomeModule
      ],
      providers : [
        HttpClient,
        { provide : UserService, useClass : MockUserService, deps : [HttpClient] },
        { provide : HttpErrorsService, useClass : MockHttpErrorsService, deps : [] },
        { provide: APP_BASE_HREF, useValue: '/'}
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  
  
  beforeEach(() => {
    router = TestBed.get(Router)
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // component['userService'].getUser();
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    component.ngOnInit();
    
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()$loggedIn', fakeAsync(() => {
    component.ngOnInit();

    tick();

    component['userService'].staticLogout();
    component['userService'].$loggedIn.next(true);
    
    fixture.detectChanges();
    tick();

    expect(component).toBeTruthy();
  }));

  it('should run #ngOnInit()$onUnAuthenticatedNavigationAttempt', fakeAsync(() => {
    component.ngOnInit();

    tick();

    component['userService'].$onUnAuthenticatedNavigationAttempt.next(<FailedNavigation> {
      "attemptedUrl" : "/",
      "type" : FAILED_NAVIGATION_TYPE.NAVIGATION
    });

    tick();

    expect(component).toBeTruthy();
  }));

  it('should run #ngOnInit()$doUserLogin', fakeAsync(() => {
    component.ngOnInit();

    tick();

    component['userService'].$doUserLogin.next(true);

    tick();
    
    expect(component).toBeTruthy();
  }));

  it('should run #ngOnInit()$onError', fakeAsync(() => {
    component.ngOnInit();

    tick();

    component['httpErrorsServices'].$onError.next([
      {
        "id" : 1234,
        "message" : "This failed",
        "type" : HTTP_ERROR_TYPES.ERROR,
        "response" : <HttpErrorResponse>{
          "status" : 401,
          "statusText" : "Unauthorized"
        }
      }
    ]);

    tick();
    
    expect(component).toBeTruthy();
  }));
});
