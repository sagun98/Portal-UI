import { TestBed, inject } from '@angular/core/testing';

import { MycloudService } from './mycloud.service';

describe('MycloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MycloudService]
    });
  });

  it('should be created', inject([MycloudService], (service: MycloudService) => {
    expect(service).toBeTruthy();
  }));
});
