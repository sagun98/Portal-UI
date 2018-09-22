import { ProductApiToolsModule } from './product-api-tools.module';

describe('ProductApiToolsModule', () => {
  let productApiToolsModule: ProductApiToolsModule;

  beforeEach(() => {
    productApiToolsModule = new ProductApiToolsModule();
  });

  it('should create an instance', () => {
    expect(productApiToolsModule).toBeTruthy();
  });
});
