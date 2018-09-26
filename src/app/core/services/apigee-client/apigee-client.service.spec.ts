import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ApigeeClientService } from './apigee-client.service';

describe('ApigeeClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        ApigeeClientService
      ]
    });
  });

  it('should be created', inject([ApigeeClientService], (service: ApigeeClientService) => {
    expect(service).toBeTruthy();
  }));
});
