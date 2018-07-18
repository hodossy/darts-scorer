import { Injectable } from '@angular/core';

import { GameBaseService } from '../game-base/game-base.service';

import { CricketScore } from './cricket-score/cricket-score.model';
import { Throw } from '../../core/throw.model';

@Injectable({
  providedIn: 'root'
})
export class CricketGameService extends GameBaseService {
  handleScore(score: Throw) {
    this.activePlayer.score.setNumbers(score.sector, score.multiplier);
  }

  checkWin() {
    let isWin = true;
    for (let key in this.activePlayer.score.numbers) {
      if (this.activePlayer.score.numbers.hasOwnProperty(key)) {
        if(this.activePlayer.score.numbers[key] !== 3) isWin = false;
      }
    }
    return isWin;
  }

  handleStart() {
    this.players.map((player) => {
      player.setInitialScore(new CricketScore());
    });
    this.activePlayerIdx = 0;
  }
}
