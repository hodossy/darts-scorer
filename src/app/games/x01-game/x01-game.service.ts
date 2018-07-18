import { Injectable } from '@angular/core';

import { GameBaseService } from '../game-base/game-base.service'
import { Throw } from '../../core/throw.model';

import { X01Settings } from './x01-settings/x01-settings.model';
import { X01Score } from './x01-score/x01-score.model';

@Injectable({
  providedIn: 'root'
})
export class X01GameService extends GameBaseService {
  private legsPlayed: number = 0;
  private setsPlayed: number = 0;
  private roundScore: number = 0;
  settings: X01Settings = new X01Settings();

  checkWin(): boolean {
    if(0 == this.activePlayer.score.current) {
      this.activePlayer.score.legs++;
      if(this.settings.legsToWin == this.activePlayer.score.legs) {
        this.activePlayer.score.sets++;
        if(this.settings.setsToWin == this.activePlayer.score.sets) {
          this.isStarted = false;
          // TODO: handle win
          return true;
        }
        this.startNewSet()
        return true;
      }
      this.startNewLeg();
      return true;
    }
    return false;
  }

  handleScore(score: Throw) {
    this.roundScore += score.value;
    this.activePlayer.score.current -= score.value;
    if (this.activePlayer.score.current === 0 && this.settings.isDoubleOut && 2 != score.multiplier
      || this.activePlayer.score.current < 0) {
      this.activePlayer.score.current += this.roundScore;
      this.throwsLeft = 0;
    }
    if (this.throwsLeft === 0) {
      this.roundScore = 0;
    }
  }

  startNewLeg() {
    this.players.map((player) => {
      player.score.current = this.settings.initialScore;
    });
    this.setNextPlayer(this.setsPlayed + ++this.legsPlayed - 2);
  }

  startNewSet() {
    this.players.map((player) => {
      player.score.legs = 0;
    });
    this.legsPlayed = 0;
    this.setsPlayed++;
    this.startNewLeg();
  }

  handleStart() {
    this.players.map((player) => {
      player.setInitialScore(new X01Score());
    });
    this.startNewSet();
  }
}
