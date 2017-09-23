import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../player/player.model';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'player-extendable-list',
  templateUrl: './player-extendable-list.component.html',
  styleUrls: ['./player-extendable-list.component.css']
})
export class PlayerExtendableListComponent implements OnInit {
  @Input() players: Player[];
  hasError: boolean;
  @Input() newPlayerName: string;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.players = this.playerService.players;
    this.newPlayerName = null;
  }

  addPlayer() {
    if(!this.newPlayerName || '' == this.newPlayerName ) return;
    for(let idx = 0; idx < this.players.length; idx++) {
      if(this.newPlayerName == this.players[idx].name) {
        this.hasError = true;
        return;
      }
    }
    // this.players.push(new Player(this.newPlayerName));
    this.playerService.addPlayer(new Player(this.newPlayerName));
    this.newPlayerName = null;
    this.hasError = false;
  }

  removePlayer(idx: number) {
    // this.players.splice(idx, 1);
    this.playerService.deletePlayer(idx);
  }
}