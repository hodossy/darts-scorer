import { Injectable } from '@angular/core';

import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';

@Injectable({
  providedIn: 'root'
})
export class GameBaseService {
  private readonly INITIAL_THROWS_LEFT = 3;
  private readonly INITIAL_ACTIVE_PLAYER_IDX = -1;

  public activePlayerIdx: number;
  public throwsLeft: number;
  public isStarted: boolean;

  constructor(public playerService: PlayerService) {
    this.reset();
  }

  get players() {
    return this.playerService.players;
  }

  get activePlayer() {
    return this.players[this.activePlayerIdx];
  }

  setNextPlayer(nextIdx: number) {
    this.activePlayerIdx = nextIdx % this.players.length;
  }

  onThrow(score: Throw) {
    this.throwsLeft--;
    this.activePlayer.history.logThrow(score);
    this.handleScore(score);
    if(!this.checkWin()) {
      if(0 == this.throwsLeft) {
        this.throwsLeft = 3;
        this.setNextPlayer(++this.activePlayerIdx);
      }
    } else {
      this.playerService.storePlayers();
      this.reset();
    }
  }

  onStart() {
    this.playerService.storePlayers();
    this.handleStart();
    this.isStarted = true;
  }

  reset() {
    this.activePlayerIdx = this.INITIAL_ACTIVE_PLAYER_IDX;
    this.throwsLeft = this.INITIAL_THROWS_LEFT;
    this.isStarted = false;
  }

  checkWin() {
    throw new Error('checkWin() must be implemented in a child');
  }

  handleScore(score: Throw) {
    throw new Error('handleScore() must be implemented in a child');
  }

  handleStart() {
    throw new Error('handleStart() must be implemented in a child');
  }
}
