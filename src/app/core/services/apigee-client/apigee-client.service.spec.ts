import { TestBed, inject } from '@angular/core/testing';

import { ApigeeClientService } from './apigee-client.service';

describe('ApigeeClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApigeeClientService]
    });
  });

  it('should be created', inject([ApigeeClientService], (service: ApigeeClientService) => {
    expect(service).toBeTruthy();
  }));
});
