import { CoreSharedModule } from './core-shared.module';

describe('CoreSharedModule', () => {
  let coreSharedModule: CoreSharedModule;

  beforeEach(() => {
    coreSharedModule = new CoreSharedModule();
  });

  it('should create an instance', () => {
    expect(coreSharedModule).toBeTruthy();
  });
});
