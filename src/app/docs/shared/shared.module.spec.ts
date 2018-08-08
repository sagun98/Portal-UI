import { DocsSharedModule } from './shared.module';

describe('SharedModule', () => {
  let sharedModule: DocsSharedModule;

  beforeEach(() => {
    sharedModule = new DocsSharedModule();
  });

  it('should create an instance', () => {
    expect(sharedModule).toBeTruthy();
  });
});
