import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { X01GameComponent } from './x01-game.component';
import { X01ScoreComponent } from './x01-score/x01-score.component';
import { X01SettingsComponent } from './x01-settings/x01-settings.component';

import { DartsTableComponent } from '../../darts-table/darts-table.component';
import { PlayerExtendableListComponent } from '../../player-extendable-list/player-extendable-list.component';

import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';

describe('X01GameComponent', () => {
  let component: X01GameComponent;
  let fixture: ComponentFixture<X01GameComponent>;
  let service: PlayerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        X01GameComponent,
        X01ScoreComponent,
        X01SettingsComponent,
        DartsTableComponent,
        PlayerExtendableListComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule ]
    })
    .compileComponents();
    TestBed.get(PlayerService).players = [
      new Player('Jane Doe'),
      new Player('John Doe'),
      new Player('Janet Doe'),
      new Player('Jack Doe'),
    ];
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X01GameComponent);
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

    it('should start the first set', () => {
      spyOn(component, "startNewSet");
      component.handleStart();
      expect(component.startNewSet).toHaveBeenCalled();
    });
  })

  describe('startNewLeg()', () => {
    it('should reset current scores', () => {
      component.players[0].score.current = 15;
      component.players[1].score.current = 51;
      component.startNewLeg();
      component.players.map((player) => {
        expect(player.score.current).toEqual(component.settings.initialScore);
      });
    });

    it('should set starting player', () => {
      expect(component.activePlayerIdx).toEqual(0);
      component.startNewLeg();
      expect(component.activePlayerIdx).toEqual(1);
      component.startNewLeg();
      expect(component.activePlayerIdx).toEqual(2);
      component.startNewSet();
      expect(component.activePlayerIdx).toEqual(1);
      component.startNewLeg();
      expect(component.activePlayerIdx).toEqual(2);
      component.startNewLeg();
      expect(component.activePlayerIdx).toEqual(3);
    });
  })

  describe('startNewSet()', () => {
    it('should reset current scores and legs', () => {
      component.players[0].score.current = 15;
      component.players[0].score.legs = 3;
      component.players[1].score.current = 51;
      component.players[1].score.legs = 2;
      component.startNewSet();
      component.players.map((player) => {
        expect(player.score.current).toEqual(component.settings.initialScore);
        expect(player.score.legs).toEqual(0);
      });
    });

    it('should set starting player', () => {
      expect(component.activePlayerIdx).toEqual(0);
      component.startNewSet();
      expect(component.activePlayerIdx).toEqual(1);
      component.startNewSet();
      expect(component.activePlayerIdx).toEqual(2);
    });

    it('should set starting player in the second set', () => {
      component.startNewLeg();
      component.startNewLeg();
      component.startNewSet();
      expect(component.activePlayerIdx).toEqual(1);
    });
  });

  describe('checkWin()', () => {
    it('should notice leg wins and reset scores', () => {
      component.activePlayer.score.current = 0;
      expect(component.checkWin()).toBeTruthy();
      component.players.map((player) => {
        expect(player.score.current).toEqual(component.settings.initialScore);
      });
      expect(component.players[0].score.legs).toEqual(1);
    });

    it('should set starting player for the new leg', () => {
      component.activePlayer.score.current = 0;
      component.checkWin()
      expect(component.activePlayer.equals(new Player('John Doe'))).toBeTruthy();
    });

    it('should notice set wins and reset scores and legs', () => {
      component.players[1].score.legs = component.settings.legsToWin - 1;
      component.players[1].score.current = 2;
      component.activePlayer.score.legs = component.settings.legsToWin - 1;
      component.activePlayer.score.current = 0;
      expect(component.checkWin()).toBeTruthy();
      component.players.map((player) => {
        expect(player.score.current).toEqual(component.settings.initialScore,
          "Scores does not match for " + JSON.stringify(player));
        expect(player.score.legs).toEqual(0,
          "Legs does not match for " + JSON.stringify(player));
      });
      expect(component.players[0].score.sets).toEqual(1, "Sets does not match");
    });

    it('should set starting player for the new set', () => {
      component.activePlayer.score.legs = component.settings.legsToWin - 1;
      component.activePlayer.score.current = 0;
      component.checkWin()
      expect(component.activePlayer.equals(new Player('John Doe'))).toBeTruthy();
    });

    it('should notice a win', () => {
      component.activePlayer.score.current = 0;
      component.activePlayer.score.legs = component.settings.legsToWin - 1;
      component.activePlayer.score.sets = component.settings.setsToWin - 1;
      expect(component.checkWin()).toBeTruthy();
    });
  });

  describe("handleScore()", () => {
    it("should substract throw value", () => {
      component.handleScore(new Throw(20, 3));
      expect(component.activePlayer.score.current).toEqual(441);
    });

    it("should allow double out", () => {
      component.activePlayer.score.current = 100;
      component.handleScore(new Throw(20, 3));
      component.handleScore(new Throw(20, 2));
      expect(component.activePlayer.score.current).toEqual(0);
    });

    it("should not allow single out and reset score", () => {
      component.activePlayer.score.current = 18;
      component.handleScore(new Throw(18, 1));
      expect(component.throwsLeft).toEqual(0);
      expect(component.activePlayer.score.current).toEqual(18);
    });

    it("should not allow triple out and reset score", () => {
      component.activePlayer.score.current = 72;
      component.handleScore(new Throw(18, 2));
      component.handleScore(new Throw(18, 1));
      component.handleScore(new Throw(6, 3));
      expect(component.activePlayer.score.current).toEqual(72);
    });

    it("should allow single out when double out is not required", () => {
      component.settings.isDoubleOut = false;
      component.activePlayer.score.current = 18;
      component.handleScore(new Throw(18, 1));
      expect(component.activePlayer.score.current).toEqual(0);
    });

    it("should allow triple out when double out is not required", () => {
      component.settings.isDoubleOut = false;
      component.activePlayer.score.current = 18;
      component.handleScore(new Throw(2, 3));
      component.handleScore(new Throw(2, 3));
      component.handleScore(new Throw(2, 3));
      expect(component.activePlayer.score.current).toEqual(0);
    });

    it("should handle overthrows", () => {
      component.activePlayer.score.current = 170;
      component.handleScore(new Throw(20, 3));
      component.handleScore(new Throw(20, 3));
      component.handleScore(new Throw(20, 3));
      expect(component.throwsLeft).toEqual(0);
      expect(component.activePlayer.score.current).toEqual(170);
    });
  });
});
