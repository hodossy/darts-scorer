export class PlayerComponent {
  public score: any;

  constructor(public name: string, private initialScore: any) {
    this.resetScore();
  }

  resetScore() {
    this.score = this.initialScore;
  }
}
