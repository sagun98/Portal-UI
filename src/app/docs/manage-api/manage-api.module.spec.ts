import { ManageApiModule } from './manage-api.module';

describe('ManageApiModule', () => {
  let manageApiModule: ManageApiModule;

  beforeEach(() => {
    manageApiModule = new ManageApiModule();
  });

  it('should create an instance', () => {
    expect(manageApiModule).toBeTruthy();
  });
});
