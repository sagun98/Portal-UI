import { TestBed, inject } from '@angular/core/testing';

import { RoleCheckGuard } from './role-check.guard';

describe('RoleCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleCheckGuard]
    });
  });

  it('should be created', inject([RoleCheckGuard], (service: RoleCheckGuard) => {
    expect(service).toBeTruthy();
  }));
});
