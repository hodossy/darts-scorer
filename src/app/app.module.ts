import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { DartsTableComponent } from './darts-table/darts-table.component';
import { PlayerAddComponent } from './player-add/player-add.component';
import { PlayerService } from './player/player.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    DartsTableComponent,
    PlayerAddComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ PlayerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
