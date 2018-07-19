import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { MatTabGroup } from '@angular/material/tabs';

import { SharedModule } from '../../shared/shared.module';
import { GameBaseService } from './game-base.service'

@Component({
  selector: 'game-base',
  templateUrl: './game-base.component.html',
  styleUrls: ['./game-base.component.css']
})
export class GameBaseComponent implements OnInit {
  @Input() settingsTemplate: TemplateRef<any>;
  @Input() scoreTemplate: TemplateRef<any>;

  @ViewChild(MatTabGroup) tabs: MatTabGroup;

  startClicked: boolean;

  constructor(private game: GameBaseService) { }

  get noPlayer() {
    return this.startClicked && this.game.players.length == 0;
  }

  onStart() {
    if(this.game.players.length == 0) {
      this.tabs.selectedIndex = 0;
      this.startClicked = true;
    } else {
      this.game.onStart();
    }
  }

  ngOnInit() {}
}
