import { NodebbModule } from './nodebb.module';

describe('NodebbModule', () => {
  let nodebbModule: NodebbModule;

  beforeEach(() => {
    nodebbModule = new NodebbModule();
  });

  it('should create an instance', () => {
    expect(nodebbModule).toBeTruthy();
  });
});
