import { PlayerStatistics } from './statistics.model';
import { Throw } from './throw.model';

describe('Model: PlayerStatistics', () => {
  let ps: PlayerStatistics;

  beforeEach(() => {
    ps = new PlayerStatistics();
  });

  it('should be created', () => {
    expect(ps).toBeDefined();
  });

  it('should log throws', () => {
    let t = new Throw(20, 2);
    ps.logThrow(t);
    expect(ps.toJSON()).toEqual({'stats': [t]});
  });

});
