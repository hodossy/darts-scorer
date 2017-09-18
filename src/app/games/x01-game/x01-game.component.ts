import { Component, OnInit } from '@angular/core';

import { Player } from '../../player/player.model';
import { PlayerService } from '../../player/player.service';
import { Throw } from '../../core/throw.model';

@Component({
  selector: 'app-game',
  templateUrl: './x01-game.component.html',
  styleUrls: ['./x01-game.component.css']
})
export class X01GameComponent implements OnInit {
  // TODO: Common fields, move these to a generic base class
  public players: Player[];
  public activePlayerIdx: number = 0;
  private throwsLeft: number = 3;
  public isStarted: boolean;
  // Game specific fields
  public legsToWin: number = 3;
  private legsPlayed: number = 0;
  public setsToWin: number = 2;
  private setsPlayed: number = 0;
  public initialScore: number = 501;
  public isDoubleOut: boolean = true;
  private scoreTemplate = {
    current: this.initialScore,
    legs: 0,
    sets: 0,
  }

  constructor(private playerService: PlayerService) { }

  get activePlayer() {
    // TODO: move to generic class
    return this.players[this.activePlayerIdx];
  }

  ngOnInit() {
    this.players = this.playerService.players
    this.players.map((player) => {
      player.setInitialScore(this.scoreTemplate)
    });
  }

  checkWin(): boolean {
    if(0 == this.activePlayer.score.current) {
      this.activePlayer.score.legs++;
      if(this.legsToWin == this.activePlayer.score.legs) {
        this.activePlayer.score.sets++;
        if(this.setsToWin == this.activePlayer.score.sets) {
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
    if (this.isDoubleOut && this.activePlayer.score.current == score.value) {
      if (2 == score.multiplier) {
        this.activePlayer.score.current -= score.value;
      } else {
        // TODO: reset score to starting point
      }
      this.throwsLeft = 0;
    } else {
      this.activePlayer.score.current -= score.value;
      this.throwsLeft--;
    }
  }

  setNextPlayer() {
    this.activePlayerIdx = ++this.activePlayerIdx % this.players.length;
  }

  startNewLeg() {
    this.players.map((player) => {
      player.score.current = this.initialScore;
    });
    this.activePlayerIdx = (this.setsPlayed + ++this.legsPlayed) % this.players.length;
  }

  startNewSet() {
    this.players.map((player) => {
      player.score.current = this.initialScore;
      player.score.legs = 0;
    });
    this.legsPlayed = 0
    this.setsPlayed++;
    this.activePlayerIdx = this.setsPlayed % this.players.length;
  }

  onThrow(score: Throw) {
    this.handleScore(score);
    if(!this.checkWin()) {
      if(0 == this.throwsLeft) {
        this.throwsLeft = 3
        this.setNextPlayer();
      }
    }
  }

}
