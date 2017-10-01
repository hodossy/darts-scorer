export class CricketScore {
  private _numbers = {
    '15': 0, '16': 0, '17': 0, '18': 0,
    '19': 0, '20': 0, '25': 0
  }
  private _current = 0;

  get current() {
    return this._current;
  }

  get numbers() {
    return this._numbers;
  }

  setNumbers(number: number, multiplier: number) {
    let key = number.toString()
    if( !(key in this._numbers) ) return;
    let bonus = this._numbers[key] + multiplier - 3;
    if( bonus > 0 ) {
      this._current += number * bonus;
    }
    this._numbers[key] = Math.min(this._numbers[key] + multiplier, 3);
  }
}
