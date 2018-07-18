import { Injectable } from '@angular/core';

import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';

@Injectable({
  providedIn: 'root'
})
export class GameBaseService {
  public activePlayerIdx: number = -1;
  public throwsLeft: number = 3;
  public isStarted: boolean = false;

  constructor(public playerService: PlayerService) { }

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
    this.handleScore(score);
    if(!this.checkWin()) {
      if(0 == this.throwsLeft) {
        this.throwsLeft = 3;
        this.setNextPlayer(++this.activePlayerIdx);
      }
    }
  }

  onStart() {
    this.handleStart();
    this.isStarted = true;
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
