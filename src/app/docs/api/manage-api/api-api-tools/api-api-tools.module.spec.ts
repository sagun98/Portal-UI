import { ApiApiToolsModule } from './api-api-tools.module';

describe('ApiApiToolsModule', () => {
  let apiApiToolsModule: ApiApiToolsModule;

  beforeEach(() => {
    apiApiToolsModule = new ApiApiToolsModule();
  });

  it('should create an instance', () => {
    expect(apiApiToolsModule).toBeTruthy();
  });
});
