import { Player } from './player.model';

describe('Model: Player', () => {
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

  it('should be equal with a Player with the same name', () => {
    let otherPlayer = new Player('John Doe');
    expect(p.equals(otherPlayer)).toBeTruthy();
  });

  it('should not be equal with a Player with different name', () => {
    let otherPlayer = new Player('Jane Doe');
    expect(p.equals(otherPlayer)).toBeFalsy();
  });
});
