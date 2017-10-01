import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { Throw } from '../../core/throw.model';
import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';

import { DartsTableComponent } from '../../darts-table/darts-table.component';
import { PlayerExtendableListComponent } from '../../player-extendable-list/player-extendable-list.component';

import { CricketGameComponent } from './cricket-game.component';
import { CricketScoreComponent } from './cricket-score/cricket-score.component';

describe('CricketGameComponent', () => {
  let component: CricketGameComponent;
  let fixture: ComponentFixture<CricketGameComponent>;
  let service: PlayerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, CoreModule, SharedModule ],
      declarations: [
        CricketGameComponent,
        CricketScoreComponent,
        DartsTableComponent,
        PlayerExtendableListComponent,
      ]
    })
    .compileComponents();
    TestBed.get(PlayerService).players = [
      new Player('Jane Doe'),
      new Player('John Doe'),
    ];
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onStart();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('handleStart()', () => {
    it('should define score', () => {
      component.players.map((player) => {
        expect(player.score).toBeDefined();
      });
    });

    it('should set first player', () => {
      expect(component.activePlayer).toBeDefined();
      expect(component.activePlayerIdx).toEqual(0);
    });
  });

  describe('handleScore()', () => {
    it('should count sectors until 3 hit', () => {
      component.handleScore(new Throw(20, 1));
      expect(component.activePlayer.score.numbers['20']).toEqual(1);

      component.handleScore(new Throw(20, 3));
      expect(component.activePlayer.score.numbers['20']).toEqual(3);
    })

    it('should add to current score for every hit over 3rd', () => {
      component.handleScore(new Throw(20, 3));
      component.handleScore(new Throw(20, 3));
      component.handleScore(new Throw(20, 3));
      expect(component.activePlayer.score.numbers['20']).toEqual(3);
      expect(component.activePlayer.score.current).toEqual(120);
    });

    it('should ignore other numbers', () => {
      let currentState = Object.assign({}, component.activePlayer.score.numbers)
      component.handleScore(new Throw(1, 3));
      component.handleScore(new Throw(5, 3));
      component.handleScore(new Throw(10, 3));
      expect(component.activePlayer.score.numbers).toEqual(currentState);
    });
  });

  describe('checkWin()', () => {
    it('should detect win condition', () => {
      component.handleScore(new Throw(15, 3));
      expect(component.checkWin()).toBeFalsy()
      component.handleScore(new Throw(16, 3));
      expect(component.checkWin()).toBeFalsy()
      component.handleScore(new Throw(17, 3));
      expect(component.checkWin()).toBeFalsy()
      component.handleScore(new Throw(18, 3));
      expect(component.checkWin()).toBeFalsy()
      component.handleScore(new Throw(19, 3));
      expect(component.checkWin()).toBeFalsy()
      component.handleScore(new Throw(20, 3));
      expect(component.checkWin()).toBeFalsy()
      component.handleScore(new Throw(25, 3));
      expect(component.checkWin()).toBeTruthy()
    });
  });
});
