import { PlayerStatistics } from './statistics.model';
import { Throw } from './throw.model';

export class Player {
  public score: any;
  public history: PlayerStatistics;
  private initialScore: any;

  constructor(public name: string, throws?: Array<Throw>) {
    this.history = new PlayerStatistics(throws);
  }

  equals(otherPlayer: Player): boolean {
    return this.name == otherPlayer.name;
  }

  setInitialScore(initialScore: any) {
    this.initialScore = initialScore;
    this.score = initialScore;
  }

  resetScore() {
    this.score = this.initialScore;
  }

  isIn(players: Player[]) {
    return players.some((current: Player) => {
      return this.equals(current);
    }, this);
  }

  toJSON() {
    return {
      name: this.name,
      history: this.history
    }
  }
}
