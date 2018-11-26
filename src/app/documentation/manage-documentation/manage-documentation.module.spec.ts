import { ManageDocumentationModule } from './manage-documentation.module';

describe('ManageDocumentationModule', () => {
  let manageDocumentationModule: ManageDocumentationModule;

  beforeEach(() => {
    manageDocumentationModule = new ManageDocumentationModule();
  });

  it('should create an instance', () => {
    expect(manageDocumentationModule).toBeTruthy();
  });
});
