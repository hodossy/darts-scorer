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

  // get oneDartAverage(): number {
  //   return this.throws.map((curr: Throw) => {
  //     return curr.value;
  //   }).reduce((prev: number, curr: number) => {
  //     return prev + curr;
  //   }) / this.throws.length;
  // }

  toJSON() {
    return {stats: this.throws};
  }

}
