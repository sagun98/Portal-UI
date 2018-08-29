import { TestBed, inject } from '@angular/core/testing';
import { NodeBBCategoryService } from './nodebb-category.service';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeBBCategoryService]
    });
  });

  it('should be created', inject([NodeBBCategoryService], (service: NodeBBCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
