import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
/* Root component*/
import { AppComponent } from './app.component';
/* Core module: Angular-Material */
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { DartsTableComponent } from './darts-table/darts-table.component';
import { PlayerExtendableListComponent } from './player-extendable-list/player-extendable-list.component';
import { X01GameComponent } from './games/x01-game/x01-game.component';
import { GameBaseComponent } from './games/game-base/game-base.component';
import { X01ScoreComponent } from './games/x01-game/x01-score/x01-score.component';
import { X01SettingsComponent } from './games/x01-game/x01-settings/x01-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DartsTableComponent,
    PlayerExtendableListComponent,
    GameBaseComponent,
    X01GameComponent,
    X01ScoreComponent,
    X01SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
