import { TestBed, inject } from '@angular/core/testing';

import { CookieParserService } from './cookie-parser.service';

describe('CookieParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieParserService]
    });
  });

  it('should be created', inject([CookieParserService], (service: CookieParserService) => {
    expect(service).toBeTruthy();
  }));
});
