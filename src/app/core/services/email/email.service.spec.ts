import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { EmailService } from './email.service';

describe('EmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [EmailService]
    });
  });

  it('should be created', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));
});
