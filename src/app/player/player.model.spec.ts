import { Player } from './player.model';

describe('Model: Throw', () => {
  let p: Player;

  beforeEach(() => {
    p = new Player("John Doe");
    p.setInitialScore(501);
  })

  it('should be created', () => {
    expect(p).toBeDefined();
  });

  it('should set the score', () => {
    expect(p.score).toBe(501);
  });

  it('should reset the score', () => {
    p.score = 401;
    p.resetScore();
    expect(p.score).toBe(501);
  });

  it('should not serialize scores', () => {
    expect(JSON.stringify(p)).toEqual('{"name":"' + p.name + '"}');
  });
});
