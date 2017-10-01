import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { DartsTableComponent } from './darts-table/darts-table.component';
import { PlayerExtendableListComponent } from './player-extendable-list/player-extendable-list.component';
import { X01GameComponent } from './games/x01-game/x01-game.component';
import { X01SettingsComponent } from './games/x01-game/x01-settings/x01-settings.component';
import { X01ScoreComponent } from './games/x01-game/x01-score/x01-score.component';

import { PlayerService } from './core/player.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DartsTableComponent,
        PlayerExtendableListComponent,
        X01GameComponent,
        X01SettingsComponent,
        X01ScoreComponent,
      ],
      imports: [
        FormsModule,
        CoreModule
      ],
      providers: [ PlayerService ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Darts Scorer'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Darts Scorer');
  }));
});
