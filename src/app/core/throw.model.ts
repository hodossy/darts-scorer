export class Throw {
  constructor(public sector: number, public multiplier: number) { }

  get value() {
    return this.sector * this.multiplier;
  }

  toJSON() {
    return {'sector': this.sector, 'multiplier': this.multiplier}
  }
}
