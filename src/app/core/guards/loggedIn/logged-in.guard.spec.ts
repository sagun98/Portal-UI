import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { LoggedInGuard } from './logged-in.guard';
import { MockUserService } from '../../layouts/side-navigation/side-navigation.component.spec';
import { UserService } from '../../services/user/user.service';
import { CookieParserService } from '../../services/cookie-parser/cookie-parser.service';

describe('LoggedInGuard', () => {

  let loggedInGuard: LoggedInGuard;
  let userService: MockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        { provide : UserService, useClass : MockUserService, deps : [HttpClient, CookieParserService] },
        HttpClient,
        LoggedInGuard
      ]
    });
  });

  beforeEach(() => {
    loggedInGuard = TestBed.get(LoggedInGuard);
    userService = TestBed.get(UserService);
  });

  it('should be created', inject([LoggedInGuard], (service: LoggedInGuard) => {
    expect(service).toBeTruthy();
  }));

  it('should guard the route', fakeAsync(()=> {
    const route: ActivatedRouteSnapshot = null;
    const state: RouterStateSnapshot = {url : 'home', root : null};
    let loggedIn: boolean;

    userService.$loggedIn.next(true);

    loggedInGuard['confirmIsLoggedIn'](route, state).subscribe(o => {
      loggedIn = o;
    });

    tick();

    expect(loggedIn).toBeTruthy();

    userService.$loggedIn.next(false);

    loggedInGuard['confirmIsLoggedIn'](route, state).subscribe(o => {
      loggedIn = o;
    });

    tick();

    expect(loggedIn).toBeFalsy();
  }));
});
