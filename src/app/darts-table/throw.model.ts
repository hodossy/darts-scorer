export class Throw {
  constructor(public sector: number, public multiplier: number) { }

  get value() {
    return this.sector * this.multiplier;
  }
}
