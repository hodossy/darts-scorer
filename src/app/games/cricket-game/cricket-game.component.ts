import { Component, Input } from '@angular/core';
import { MdInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { GameBaseComponent } from '../game-base/game-base.component';
import { CricketScoreComponent } from './cricket-score/cricket-score.component';

import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';
import { CricketScore } from './cricket-score/cricket-score.model';

@Component({
  selector: 'cricket-game',
  templateUrl: './cricket-game.component.html',
  styleUrls: ['./cricket-game.component.css']
})
export class CricketGameComponent extends GameBaseComponent {
  private scoreTemplate: CricketScore = new CricketScore();

  handleScore(score: Throw) {
    this.activePlayer.score.setNumbers(score.sector, score.multiplier);
  }

  checkWin() {
    let isWin = false;
    for (let key in this.activePlayer.score.numbers) {
      if (this.activePlayer.score.numbers.hasOwnProperty(key)) {
        if(this.activePlayer.score.numbers[key] !== 3) isWin = true;
      }
    }
    return isWin;
  }

  handleStart() {
    this.players.map((player) => {
      player.setInitialScore(Object.assign({}, this.scoreTemplate));
    });
  }
}
