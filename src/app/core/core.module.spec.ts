import { DevPortalCoreModule } from './core.module';

describe('DevPortalCoreModule', () => {
  let coreModule: DevPortalCoreModule;

  beforeEach(() => {
    coreModule = new DevPortalCoreModule();
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();   
  });
});
