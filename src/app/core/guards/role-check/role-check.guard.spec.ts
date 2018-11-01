import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import {RoleCheckGuard} from './role-check.guard';
import { Router, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { MockUserService } from '../../layouts/side-navigation/side-navigation.component.spec';
import { PermissionsService } from '../../services/permissions/permissions.service';
import { UserRole } from '../../interfaces/fr-user.interface';

describe('RoleCheckGuard', () => {
  let roleCheckGuard: RoleCheckGuard;

  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  let route: ActivatedRouteSnapshot = {
    params : null,
    paramMap : null,
    pathFromRoot : null,
    routeConfig : null,
    root : null,
    children : null,
    parent : null,
    firstChild : null,
    queryParams : null,
    queryParamMap : null,
    component : null,
    fragment : null,
    outlet : null,
    url : null,
    data : {
      permissions : ['ADMIN']
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        {provide : UserService, useClass : MockUserService, deps : [HttpClient]},
        PermissionsService
      ]
    });
  });
    
  it('should run #canActivate(): Role:ADMIN | Guard:Admin', inject([RoleCheckGuard], (guard: RoleCheckGuard) => {
    let canActive = <Observable<boolean>> guard.canActivate(route, null);
    
    canActive.subscribe(allowed => {
      expect(allowed).toBeTruthy();
    });
  }));

  it('should run #canActivate(): Role:API_DEVELOPER | Guard:Admin', inject([RoleCheckGuard, UserService], (guard: RoleCheckGuard, userService : UserService) => {
    let canActive = <Observable<boolean>> guard.canActivate(route, null);

    userService['_user'].roles = [
      <UserRole> {id : '1234', name : 'API_DEVELOPER', privileges : []}
    ];
    
    canActive.subscribe(allowed => {
      expect(allowed).toBeFalsy();
    });
  }));
        
  it('should run #canActivateChild(): Role:None | Guard:Admin', inject([RoleCheckGuard, UserService], (guard: RoleCheckGuard, userService : UserService) => {
    let canActive = <Observable<boolean>> guard.canActivateChild(route, null);

    userService['_user'].roles = [];
    
    canActive.subscribe(allowed => {
      expect(allowed).toBeFalsy();
    });
  }));
});
