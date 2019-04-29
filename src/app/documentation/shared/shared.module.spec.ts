import { DocumentationSharedModule } from './shared.module';

describe('SharedModule', () => {
  let sharedModule: DocumentationSharedModule;

  beforeEach(() => {
    sharedModule = new DocumentationSharedModule();
  });

  it('should create an instance', () => {
    expect(DocumentationSharedModule).toBeTruthy();
  });
});
