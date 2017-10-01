import { CricketScore } from './cricket-score.model';

describe('Model: CricketScore', () => {
  let cs: CricketScore;

  beforeEach(() => {
    cs = new CricketScore();
  });

  it('should register throws', () => {
    cs.setNumbers(15, 1);
    expect(cs.numbers['15']).toEqual(1);
    cs.setNumbers(15, 2);
    expect(cs.numbers['15']).toEqual(3);
    cs.setNumbers(25, 3);
    expect(cs.numbers['25']).toEqual(3);
  });

  it('should add to current after 3 hits', () => {
    cs.setNumbers(15, 3);
    expect(cs.numbers['15']).toEqual(3);
    cs.setNumbers(15, 2);
    expect(cs.numbers['15']).toEqual(3);
    expect(cs.current).toEqual(30);

    cs.setNumbers(25, 2);
    cs.setNumbers(25, 2);
    expect(cs.numbers['25']).toEqual(3);
    expect(cs.current).toEqual(55);
  });

  it('should not care with other numbers', () => {
    let currentState = Object.assign({}, cs.numbers);
    cs.setNumbers(1, 1);
    expect(cs.numbers).toEqual(currentState);
    cs.setNumbers(5, 1);
    expect(cs.numbers).toEqual(currentState);
    cs.setNumbers(10, 1);
    expect(cs.numbers).toEqual(currentState);
  });
});
