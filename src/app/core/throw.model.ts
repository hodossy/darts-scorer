export class Throw {
  sector: number;
  multiplier: number;

  get value() {
    return this.sector * this.multiplier;
  }
}
