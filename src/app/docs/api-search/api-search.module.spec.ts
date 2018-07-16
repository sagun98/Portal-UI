import { ApiSearchModule } from './api-search.module';

describe('ApiSearchModule', () => {
  let apiSearchModule: ApiSearchModule;

  beforeEach(() => {
    apiSearchModule = new ApiSearchModule();
  });

  it('should create an instance', () => {
    expect(apiSearchModule).toBeTruthy();
  });
});
