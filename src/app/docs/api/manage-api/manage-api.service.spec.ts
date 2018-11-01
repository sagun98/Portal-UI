import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ManageApiService } from './manage-api.service';

describe('ManageApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        ManageApiService
      ]
    });
  });

  it('should be created', inject([ManageApiService], (service: ManageApiService) => {
    expect(service).toBeTruthy();
  }));
});
