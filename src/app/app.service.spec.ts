import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        AppService
      ]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));
});
