import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('ApiSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [
        HttpClient, 
        ToastrService,
        SearchService
      ]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});