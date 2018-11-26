import { ManageDocumentationAreaModule } from './manage-documentation-area.module';

describe('ManageDocumentationAreaModule', () => {
  let manageDocumentationAreaModule: ManageDocumentationAreaModule;

  beforeEach(() => {
    manageDocumentationAreaModule = new ManageDocumentationAreaModule();
  });

  it('should create an instance', () => {
    expect(manageDocumentationAreaModule).toBeTruthy();
  });
});
