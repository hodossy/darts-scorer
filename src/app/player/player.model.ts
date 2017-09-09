export class Player {
  public score: any;

  constructor(public name: string, private initialScore: any) {
    this.resetScore();
  }

  resetScore() {
    this.score = this.initialScore;
  }
}
