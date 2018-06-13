import { TestBed, inject } from '@angular/core/testing';

import { HttpErrorsService } from './http-errors.service';

describe('HttpErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorsService]
    });
  });

  it('should be created', inject([HttpErrorsService], (service: HttpErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
