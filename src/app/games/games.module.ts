import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameBaseComponent } from './game-base/game-base.component';

import { CricketGameComponent } from './cricket-game/cricket-game.component';
import { CricketScoreComponent } from './cricket-game/cricket-score/cricket-score.component';

import { X01GameComponent } from './x01-game/x01-game.component';
import { X01ScoreComponent } from './x01-game/x01-score/x01-score.component';
import { X01SettingsComponent } from './x01-game/x01-settings/x01-settings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GameBaseComponent,
    CricketGameComponent,
    CricketScoreComponent,
    X01GameComponent,
    X01ScoreComponent,
    X01SettingsComponent
  ],
  exports: [
    CricketGameComponent,
    X01GameComponent
  ],
  providers: [

  ]
})
export class GamesModule { }
