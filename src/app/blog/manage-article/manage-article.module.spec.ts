import { ManageArticleModule } from './manage-article.module';

describe('ManageArticleModule', () => {
  let manageArticleModule: ManageArticleModule;

  beforeEach(() => {
    manageArticleModule = new ManageArticleModule();
  });

  it('should create an instance', () => {
    expect(manageArticleModule).toBeTruthy();
  });
});
