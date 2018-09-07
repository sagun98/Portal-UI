import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NodeBBUserService } from './nodebb-user.service';
import { TestBed, inject } from '@angular/core/testing';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        NodeBBUserService
      ]
    });
  });

  it('should be created', inject([NodeBBUserService], (service: NodeBBUserService) => {
    expect(service).toBeTruthy();
  }));
});
