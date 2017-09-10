export class Player {
  public score: any;
  private initialScore: any;

  constructor(public name: string) {
  }

  setInitialScore(initialScore: any) {
    this.initialScore = initialScore;
    this.score = initialScore;
  }

  resetScore() {
    this.score = this.initialScore;
  }

  toJSON() {
    return {name: this.name}
  }
}
