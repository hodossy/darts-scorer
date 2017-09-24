import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { X01GameComponent } from './x01-game.component';
import { DartsTableComponent } from '../../darts-table/darts-table.component';
import { Player } from '../../player/player.model';
import { PlayerService } from '../../player/player.service';
import { PlayerExtendableListComponent } from '../../player-extendable-list/player-extendable-list.component';
import { Throw } from '../../core/throw.model';

describe('X01GameComponent', () => {
  let component: X01GameComponent;
  let fixture: ComponentFixture<X01GameComponent>;
  let service: PlayerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        X01GameComponent,
        DartsTableComponent,
        PlayerExtendableListComponent
      ],
      providers: [ PlayerService ]
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
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize players', () => {
    expect(component.players.length).toEqual(4);
    expect(component.activePlayer).toBe(component.players[0]);
  });

  it('should define score', () => {
    component.players.map((player) => {
      expect(player.score).toBeDefined();
    });
  });

  it('should set next player', () => {
    for(let i = 1; i < component.players.length * 2; i++) {
      component.setNextPlayer();
      expect(component.activePlayer).toBe(component.players[i % component.players.length]);
      expect(component.activePlayerIdx).toEqual(i % component.players.length);
    }
  });

  describe('startNewLeg()', () => {
    it('should reset current scores', () => {
      component.players[0].score.current = 15;
      component.players[1].score.current = 51;
      component.startNewLeg();
      component.players.map((player) => {
        expect(player.score.current).toEqual(component.initialScore);
      });
    });

    it('should set starting player in the first set', () => {
      component.startNewLeg();
      expect(component.activePlayerIdx).toEqual(1);
    });

    it('should set starting player in the second set', () => {
      component.startNewSet();
      expect(component.activePlayerIdx).toEqual(1);
      component.startNewLeg();
      expect(component.activePlayerIdx).toEqual(2);
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
        expect(player.score.current).toEqual(component.initialScore);
        expect(player.score.legs).toEqual(0);
      });
    });

    it('should set starting player', () => {
      component.startNewSet();
      expect(component.activePlayerIdx).toEqual(1);
      component.startNewSet();
      expect(component.activePlayerIdx).toEqual(2);
    });

    it('should set starting player in the second set', () => {
      component.startNewLeg();
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
        expect(player.score.current).toEqual(component.initialScore);
      });
      expect(component.players[1].score.legs).toEqual(1);
    });

    it('should set starting player for the new leg', () => {
      component.activePlayer.score.current = 0;
      component.checkWin()
      expect(component.activePlayer.equals(new Player('John Doe'))).toBeTruthy();
    });

    it('should notice set wins and reset scores and legs', () => {
      component.players[1].score.legs = component.legsToWin - 1;
      component.players[1].score.current = 2;
      component.activePlayer.score.legs = component.legsToWin - 1;
      component.activePlayer.score.current = 0;
      expect(component.checkWin()).toBeTruthy();
      component.players.map((player) => {
        expect(player.score.current).toEqual(component.initialScore,
          "Scores does not match for " + JSON.stringify(player));
        expect(player.score.legs).toEqual(0,
          "Legs does not match for " + JSON.stringify(player));
      });
      expect(component.players[0].score.sets).toEqual(1, "Sets does not match");
    });

    it('should set starting player for the new set', () => {
      component.activePlayer.score.legs = component.legsToWin - 1;
      component.activePlayer.score.current = 0;
      component.checkWin()
      expect(component.activePlayer.equals(new Player('John Doe'))).toBeTruthy();
    });

    it('should notice a win', () => {
      component.activePlayer.score.current = 0;
      component.activePlayer.score.legs = component.legsToWin - 1;
      component.activePlayer.score.sets = component.setsToWin - 1;
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
      component.isDoubleOut = false;
      component.activePlayer.score.current = 18;
      component.handleScore(new Throw(18, 1));
      expect(component.activePlayer.score.current).toEqual(0);
    });

    it("should allow triple out when double out is not required", () => {
      component.isDoubleOut = false;
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
      expect(component.activePlayer.score.current).toEqual(170);
    });
  });

  describe("onThrow()", () => {
    it('should select next player after 3 throws', () => {
      let activeIdx = 0;
      for(let i = 1; i <= component.players.length * 6; i++) {
        component.onThrow(new Throw(1, 3));
        if (i % 3 === 0) {
          activeIdx = (i / 3) % component.players.length;
          expect(component.activePlayer).toBe(component.players[activeIdx],
            "Failed after " + i + " iterations!")
        }
      }
    });

    it('should handle overthrows', () => {
      component.activePlayer.score.current = 100;
      component.onThrow(new Throw(20, 3));
      component.onThrow(new Throw(20, 3));
      expect(component.activePlayerIdx).toEqual(1);
      expect(component.players[0].score.current).toEqual(100);

      component.activePlayer.score.current = 100;
      component.onThrow(new Throw(20, 3));
      component.onThrow(new Throw(20, 3));
      expect(component.activePlayerIdx).toEqual(2);
      expect(component.players[0].score.current).toEqual(100);
    });

    it('should notice leg wins', () => {
      component.activePlayer.score.current = 100;
      component.onThrow(new Throw(20, 3));
      component.onThrow(new Throw(20, 2));
      expect(component.activePlayerIdx).toEqual(1);
      expect(component.players[0].score.current).toEqual(501);
      expect(component.players[0].score.legs).toEqual(1);
    });
  });
});
