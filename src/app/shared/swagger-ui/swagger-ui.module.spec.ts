import { SwaggerUiModule } from './swagger-ui.module';

describe('SwaggerUiModule', () => {
  let swaggerUiModule: SwaggerUiModule;

  beforeEach(() => {
    swaggerUiModule = new SwaggerUiModule();
  });

  it('should create an instance', () => {
    expect(swaggerUiModule).toBeTruthy();
  });
});
