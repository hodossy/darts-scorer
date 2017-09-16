import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DartsTableComponent } from './darts-table/darts-table.component';
import { PlayerService } from './player/player.service';
import { PlayerExtendableListComponent } from './player-extendable-list/player-extendable-list.component';
import { X01GameComponent } from './games/x01-game/x01-game.component';

@NgModule({
  declarations: [
    AppComponent,
    DartsTableComponent,
    PlayerExtendableListComponent,
    X01GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ PlayerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
