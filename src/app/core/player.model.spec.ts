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
    expect(JSON.stringify(p)).toEqual('{"name":"' + p.name + ', "history": []"}');
  });

  it('should be equal with a Player with the same name', () => {
    let otherPlayer = new Player('John Doe');
    expect(p.equals(otherPlayer)).toBeTruthy();
  });

  it('should not be equal with a Player with different name', () => {
    let otherPlayer = new Player('Jane Doe');
    expect(p.equals(otherPlayer)).toBeFalsy();
  });

  it('should identify itself in a list of players when present', () => {
    let others = [new Player('Jane Doe'), new Player('John Doe'), new Player('Some other guy')];
    expect(p.isIn(others)).toBeTruthy();
  });

  it('should not identify itself in a list of players when not present', () => {
    let others = [new Player('Jane Doe'), new Player('Some other guy')];
    expect(p.isIn(others)).toBeFalsy();
  });
});
