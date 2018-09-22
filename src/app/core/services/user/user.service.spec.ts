import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {UserService} from './user.service';

describe('UserService', () => {
  let service;
  const http = new HttpClient(null);
      
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        UserService
      ]
    });

  });

    
  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
        
  it('should run #setLoggedInState()', inject([UserService], (service: UserService) => {
    // const result = setLoggedInState();
  }));
        
  it('should run #authenticate()', inject([UserService], (service: UserService) => {
    // const result = authenticate(credentials);
  }));
        
  it('should run #getUser()', inject([UserService], (service: UserService) => {
    // const result = getUser();
  }));
        
  it('should run #getUserById()', inject([UserService], (service: UserService) => {
    // const result = getUserById(userId);
  }));
        
  it('should run #updateRoles()', inject([UserService], (service: UserService) => {
    // const result = updateRoles(user);
  }));
        
  it('should run #logout()', inject([UserService], (service: UserService) => {
    // const result = logout();
  }));
        
  it('should run #staticLogout()', inject([UserService], (service: UserService) => {
    // const result = staticLogout();
  }));
        
  it('should run #tapUser()', inject([UserService], (service: UserService) => {
    // const result = tapUser(user);
  }));
      
});
