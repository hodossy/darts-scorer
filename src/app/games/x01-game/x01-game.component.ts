import { Component, Input, OnInit } from '@angular/core';
import { MdInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';

@Component({
  selector: 'game-x01',
  templateUrl: './x01-game.component.html',
  styleUrls: ['./x01-game.component.css']
})
export class X01GameComponent implements OnInit {
  // TODO: Common fields, move these to a generic base class
  public players: Player[];
  public activePlayerIdx: number = -1;
  private throwsLeft: number = 3;
  public isStarted: boolean = false;
  // Game specific fields
  @Input() legsToWin: number = 3;
  private legsPlayed: number = 0;
  @Input() setsToWin: number = 2;
  private setsPlayed: number = 0;
  isDoubleOut: boolean = true;
  @Input() initialScore: number = 501;
  private roundScore = 0;
  private scoreTemplate = {
    current: 0,
    legs: 0,
    sets: 0,
  }

  scoreOptions = [
    {value: 301, viewValue: '301'},
    {value: 501, viewValue: '501'},
    {value: 701, viewValue: '701'},
    {value: 1001, viewValue: '1001'}
  ];

  constructor(private playerService: PlayerService) { }

  get activePlayer() {
    // TODO: move to generic class
    return this.players[this.activePlayerIdx];
  }

  ngOnInit() {
    this.players = this.playerService.players
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
    this.roundScore += score.value;
    this.activePlayer.score.current -= score.value;
    if (this.activePlayer.score.current === 0 && this.isDoubleOut && 2 != score.multiplier
      || this.activePlayer.score.current < 0) {
      this.activePlayer.score.current += this.roundScore;
      this.throwsLeft = 0;
    }
  }

  setNextPlayer(nextIdx: number) {
    this.activePlayerIdx = nextIdx % this.players.length;
  }

  startNewLeg() {
    this.players.map((player) => {
      player.score.current = this.initialScore;
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

  onThrow(score: Throw) {
    this.throwsLeft--;
    this.handleScore(score);
    if(!this.checkWin()) {
      if(0 == this.throwsLeft) {
        this.throwsLeft = 3;
        this.roundScore = 0;
        this.setNextPlayer(++this.activePlayerIdx);
      }
    }
  }

  onStart() {
    this.players.map((player) => {
      player.setInitialScore(Object.assign({}, this.scoreTemplate));
    });
    this.isStarted = true;
    this.startNewSet();
  }

}
