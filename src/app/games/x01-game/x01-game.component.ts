import { Component, OnInit } from '@angular/core';

import { Player } from '../../player/player.model';
import { Throw } from '../../core/throw.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class X01GameComponent implements OnInit {
  // TODO: Common fields, move these to a generic base class
  public players: Player[];
  public activePlayer: Player;
  private throwsLeft: number = 3;
  public isStarted: boolean;
  // Game specific fields
  public legsToWin: number = 3;
  public setsToWin: number = 1;
  public initialScore: number = 501;
  public isDoubleOut: boolean = true;

  constructor() { }

  ngOnInit() {
    // TODO: get players from service
    this.activePlayer = this.players[0];
  }

  checkWin() {
    if(0 == this.activePlayer.score.value) {
      this.activePlayer.score.legs++;
    }
    if(this.legsToWin == this.activePlayer.score.legs) {
      this.activePlayer.score.sets++;
    }
    if(this.setsToWin == this.activePlayer.score.sets) {
      this.isStarted = false;
      // TODO: handle win
    }
  }

  setNextPlayer() {
    // TODO: move this to a generic base class
    this.players.unshift(this.players.pop());
    this.activePlayer = this.players[0];
  }

  onThrow(score: Throw) {
    this.activePlayer.score.actual -= score.value;
    this.throwsLeft--;
    this.checkWin();
    if(0 == this.throwsLeft) {
      this.throwsLeft = 3
      this.setNextPlayer();
    }
  }

}
