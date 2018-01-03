import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';

@Component({
  selector: 'game-base',
  templateUrl: './game-base.component.html',
  styleUrls: ['./game-base.component.css']
})
export class GameBaseComponent implements OnInit {
  public players: Player[];
  public activePlayerIdx: number = -1;
  public throwsLeft: number = 3;
  public isStarted: boolean = false;
  public scoreComponent;
  public settingsComponent;

  constructor(private playerService: PlayerService) { }

  get activePlayer() {
    return this.players[this.activePlayerIdx];
  }

  ngOnInit() {
    this.players = this.playerService.players
  }

  setNextPlayer(nextIdx: number) {
    this.activePlayerIdx = nextIdx % this.players.length;
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
}
