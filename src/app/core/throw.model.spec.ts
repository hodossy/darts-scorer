import { Throw } from './throw.model';

describe('Model: Throw', () => {
  let t: Throw;

  beforeEach(() => {
    t = new Throw(20, 3);
  })

  it('should be created', () => {
    expect(t).toBeDefined();
  });

  it('should return the value', () => {
    expect(t.value).toBe(60);
  });
});
