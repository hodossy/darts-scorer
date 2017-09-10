import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../player/player.model';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {
  @Input() newPlayerName: string = null;
  hasError: boolean;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  addPlayer() {
    this.hasError = !this.playerService.addPlayer(this.newPlayerName);
  }
}
