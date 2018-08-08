import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import {RoleCheckGuard} from './role-check.guard';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('RoleCheckGuard', () => {
  let service;

  let router = {
    navigate: jasmine.createSpy('navigate')
  };

    
  const userService = {
    // mock properties here 
  }
        
  const permissionsService = {
    // mock properties here 
  }
      
  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [
          CommonModule, 
          HttpClientModule
        ],
        providers: [
          RoleCheckGuard,
          {provide: Router, useValue: router}
        ]
    })
    .compileComponents();

    //service = new RoleCheckGuard(userService, permissionsService);
  });

    
  it('should run #canActivate()', async(() => {
    // const result = canActivate(route, state);
  }));
        
  it('should run #canActivateChild()', async(() => {
    // const result = canActivateChild(childRoute, state);
  }));
        
  it('should run #checkRoles()', async(() => {
    // const result = checkRoles(route, state);
  }));
      
});
