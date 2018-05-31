import { TestBed, inject } from '@angular/core/testing';

import { SwaggerUiService } from './swagger-ui.service';

describe('SwaggerUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwaggerUiService]
    });
  });

  it('should be created', inject([SwaggerUiService], (service: SwaggerUiService) => {
    expect(service).toBeTruthy();
  }));
});
