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
    this.hasError = false;
    if(!this.newPlayerName || '' == this.newPlayerName ) return;
    let newPlayer = new Player(this.newPlayerName)
    if(!newPlayer.isIn(this.players)){
      this.playerService.addPlayer(newPlayer);
      this.newPlayerName = null;
    } else {
      this.hasError = true;
    }
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
