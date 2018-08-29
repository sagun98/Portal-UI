import { NodeBBUserService } from './nodebb-user.service';
import { TestBed, inject } from '@angular/core/testing';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeBBUserService]
    });
  });

  it('should be created', inject([NodeBBUserService], (service: NodeBBUserService) => {
    expect(service).toBeTruthy();
  }));
});
