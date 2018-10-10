import { TestBed, inject } from '@angular/core/testing';

import { ManageApiService } from './manage-api.service';

describe('ManageApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageApiService]
    });
  });

  it('should be created', inject([ManageApiService], (service: ManageApiService) => {
    expect(service).toBeTruthy();
  }));
});
