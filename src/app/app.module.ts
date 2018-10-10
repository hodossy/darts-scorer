import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Root component*/
import { AppComponent } from './app.component';
/* Core module: Angular-Material */
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { GoogleService } from './social/google.service';

import { DartsTableComponent } from './darts-table/darts-table.component';
import { PlayerExtendableListComponent } from './player-extendable-list/player-extendable-list.component';
import { X01GameComponent } from './games/x01-game/x01-game.component';
import { GameBaseComponent } from './games/game-base/game-base.component';
import { X01ScoreComponent } from './games/x01-game/x01-score/x01-score.component';
import { X01SettingsComponent } from './games/x01-game/x01-settings/x01-settings.component';
import { CricketGameComponent } from './games/cricket-game/cricket-game.component';
import { CricketScoreComponent } from './games/cricket-game/cricket-score/cricket-score.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';

export const appRoutes: Routes = [
  { path: 'games/x01', component: X01GameComponent },
  { path: 'games/cricket', component: CricketGameComponent },
  { path: '',   redirectTo: '/games/x01', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

export function initGapi(gapiSession: GoogleService) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    AppComponent,
    DartsTableComponent,
    PlayerExtendableListComponent,
    GameBaseComponent,
    X01GameComponent,
    X01ScoreComponent,
    X01SettingsComponent,
    CricketGameComponent,
    CricketScoreComponent,
    PageNotFoundComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GoogleService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
