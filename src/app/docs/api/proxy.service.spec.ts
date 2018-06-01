import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        ProxyService,
        HttpClient
      ]
    });
  });

  it('should be created', inject([ProxyService], (service: ProxyService) => {
    expect(service).toBeTruthy();
  }));
});
