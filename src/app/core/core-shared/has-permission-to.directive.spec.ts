import { TestBed, inject } from '@angular/core/testing';

import { HasPermissionToDirective } from './has-permission-to.directive';

describe('HasPermissionToService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasPermissionToDirective]
    });
  });

  it('should be created', inject([HasPermissionToDirective], (service: HasPermissionToDirective) => {
    expect(service).toBeTruthy();
  }));
});
