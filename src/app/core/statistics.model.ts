import { Throw } from './throw.model';

export class PlayerStatistics {
  private throws: Array<Throw>;

  constructor(throws?: Array<Throw>) {
    this.throws = throws || Array<Throw>();
  }

  logThrow(item: Throw) {
    this.throws.push(item);
  }

  // get maxValuedThrow(): Throw {
  //   return this.throws.reduce((prev: Throw, curr: Throw) => {
  //     return curr.value > prev.value ? curr : prev;
  //   });
  // }
  //
  // get oneDartAverage(): number {
  //   return this.throws.reduce((prev: number, curr: Throw) => {
  //     return prev + curr.value;
  //   }) / this.throws.length;
  // }

  toJSON() {
    return {'stats': this.throws};
  }

}
