import { Component, OnInit, Input } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { Player } from '../core/player.model';
import { PlayerService } from '../core/player.service';

@Component({
  selector: 'player-extendable-list',
  templateUrl: './player-extendable-list.component.html',
  styleUrls: ['./player-extendable-list.component.scss']
})
export class PlayerExtendableListComponent implements OnInit {
  @Input() players: Player[];
  cachedPlayers: Player[];
  hasError: boolean;
  @Input() newPlayerName: string;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.players = this.playerService.players;
    this.cachedPlayers = this.playerService.getCachedPlayers();
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
    this.playerService.addPlayer(new Player(this.newPlayerName));
    this.newPlayerName = null;
    this.hasError = false;
  }

  addCachedPlayer(player: Player) {
    if(!player.isIn(this.players)) {
      this.playerService.addPlayer(player);
    }
  }

  // removeCachedPlayer

  removePlayer(idx: number) {
    this.playerService.deletePlayer(idx);
  }
}
