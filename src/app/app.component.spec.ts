import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Location } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { AppComponent } from './app.component';
import { appRoutes } from './app.module';

import { CoreModule } from './core/core.module';

import { DartsTableComponent } from './darts-table/darts-table.component';
import { PlayerExtendableListComponent } from './player-extendable-list/player-extendable-list.component';
import { X01GameComponent } from './games/x01-game/x01-game.component';
import { X01SettingsComponent } from './games/x01-game/x01-settings/x01-settings.component';
import { X01ScoreComponent } from './games/x01-game/x01-score/x01-score.component';
import { CricketGameComponent } from './games/cricket-game/cricket-game.component';
import { CricketScoreComponent } from './games/cricket-game/cricket-score/cricket-score.component';
import { PageNotFoundComponent } from './not-found/not-found.component';

import { PlayerService } from './core/player.service';

describe('AppComponent', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DartsTableComponent,
        PlayerExtendableListComponent,
        CricketGameComponent,
        CricketScoreComponent,
        X01GameComponent,
        X01SettingsComponent,
        X01ScoreComponent,
        PageNotFoundComponent,
      ],
      imports: [
        FormsModule,
        CoreModule,
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [ PlayerService ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Darts Scorer'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Darts Scorer');
  }));
});
