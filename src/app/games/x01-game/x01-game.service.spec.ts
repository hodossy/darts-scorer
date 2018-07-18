import { TestBed, inject } from '@angular/core/testing';

import { X01GameService } from './x01-game.service';

import { Throw } from '../../core/throw.model';
import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';

describe('X01GameService', () => {
  let service: X01GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [X01GameService, PlayerService]
    });
    TestBed.get(PlayerService).players = [
      new Player('Jane Doe'),
      new Player('John Doe'),
      new Player('Janet Doe'),
      new Player('Jack Doe'),
    ];
    service = TestBed.get(X01GameService);
    service.handleStart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleStart()', () => {
    it('should define score', () => {
      service.players.map((player) => {
        expect(player.score).toBeDefined();
      });
    });

    it('should start the first set', () => {
      spyOn(service, "startNewSet");
      service.handleStart();
      expect(service.startNewSet).toHaveBeenCalled();
    });
  })

  describe('startNewLeg()', () => {
    it('should reset current scores', () => {
      service.players[0].score.current = 15;
      service.players[1].score.current = 51;
      service.startNewLeg();
      service.players.map((player) => {
        expect(player.score.current).toEqual(service.settings.initialScore);
      });
    });

    it('should set starting player', () => {
      expect(service.activePlayerIdx).toEqual(0);
      service.startNewLeg();
      expect(service.activePlayerIdx).toEqual(1);
      service.startNewLeg();
      expect(service.activePlayerIdx).toEqual(2);
      service.startNewSet();
      expect(service.activePlayerIdx).toEqual(1);
      service.startNewLeg();
      expect(service.activePlayerIdx).toEqual(2);
      service.startNewLeg();
      expect(service.activePlayerIdx).toEqual(3);
    });
  })

  describe('startNewSet()', () => {
    it('should reset current scores and legs', () => {
      service.players[0].score.current = 15;
      service.players[0].score.legs = 3;
      service.players[1].score.current = 51;
      service.players[1].score.legs = 2;
      service.startNewSet();
      service.players.map((player) => {
        expect(player.score.current).toEqual(service.settings.initialScore);
        expect(player.score.legs).toEqual(0);
      });
    });

    it('should set starting player', () => {
      expect(service.activePlayerIdx).toEqual(0);
      service.startNewSet();
      expect(service.activePlayerIdx).toEqual(1);
      service.startNewSet();
      expect(service.activePlayerIdx).toEqual(2);
    });

    it('should set starting player in the second set', () => {
      service.startNewLeg();
      service.startNewLeg();
      service.startNewSet();
      expect(service.activePlayerIdx).toEqual(1);
    });
  });

  describe('checkWin()', () => {
    it('should notice leg wins and reset scores', () => {
      service.activePlayer.score.current = 0;
      expect(service.checkWin()).toBeTruthy();
      service.players.map((player) => {
        expect(player.score.current).toEqual(service.settings.initialScore);
      });
      expect(service.players[0].score.legs).toEqual(1);
    });

    it('should set starting player for the new leg', () => {
      service.activePlayer.score.current = 0;
      service.checkWin()
      expect(service.activePlayer.equals(new Player('John Doe'))).toBeTruthy();
    });

    it('should notice set wins and reset scores and legs', () => {
      service.players[1].score.legs = service.settings.legsToWin - 1;
      service.players[1].score.current = 2;
      service.activePlayer.score.legs = service.settings.legsToWin - 1;
      service.activePlayer.score.current = 0;
      expect(service.checkWin()).toBeTruthy();
      service.players.map((player) => {
        expect(player.score.current).toEqual(service.settings.initialScore,
          "Scores does not match for " + JSON.stringify(player));
        expect(player.score.legs).toEqual(0,
          "Legs does not match for " + JSON.stringify(player));
      });
      expect(service.players[0].score.sets).toEqual(1, "Sets does not match");
    });

    it('should set starting player for the new set', () => {
      service.activePlayer.score.legs = service.settings.legsToWin - 1;
      service.activePlayer.score.current = 0;
      service.checkWin()
      expect(service.activePlayer.equals(new Player('John Doe'))).toBeTruthy();
    });

    it('should notice a win', () => {
      service.activePlayer.score.current = 0;
      service.activePlayer.score.legs = service.settings.legsToWin - 1;
      service.activePlayer.score.sets = service.settings.setsToWin - 1;
      expect(service.checkWin()).toBeTruthy();
    });
  });

  describe("handleScore()", () => {
    it("should substract throw value", () => {
      service.handleScore(new Throw(20, 3));
      expect(service.activePlayer.score.current).toEqual(441);
    });

    it("should allow double out", () => {
      service.activePlayer.score.current = 100;
      service.handleScore(new Throw(20, 3));
      service.handleScore(new Throw(20, 2));
      expect(service.activePlayer.score.current).toEqual(0);
    });

    it("should not allow single out and reset score", () => {
      service.activePlayer.score.current = 18;
      service.handleScore(new Throw(18, 1));
      expect(service.throwsLeft).toEqual(0);
      expect(service.activePlayer.score.current).toEqual(18);
    });

    it("should not allow triple out and reset score", () => {
      service.activePlayer.score.current = 72;
      service.handleScore(new Throw(18, 2));
      service.handleScore(new Throw(18, 1));
      service.handleScore(new Throw(6, 3));
      expect(service.activePlayer.score.current).toEqual(72);
    });

    it("should allow single out when double out is not required", () => {
      service.settings.isDoubleOut = false;
      service.activePlayer.score.current = 18;
      service.handleScore(new Throw(18, 1));
      expect(service.activePlayer.score.current).toEqual(0);
    });

    it("should allow triple out when double out is not required", () => {
      service.settings.isDoubleOut = false;
      service.activePlayer.score.current = 18;
      service.handleScore(new Throw(2, 3));
      service.handleScore(new Throw(2, 3));
      service.handleScore(new Throw(2, 3));
      expect(service.activePlayer.score.current).toEqual(0);
    });

    it("should handle overthrows", () => {
      service.activePlayer.score.current = 170;
      service.handleScore(new Throw(20, 3));
      service.handleScore(new Throw(20, 3));
      service.handleScore(new Throw(20, 3));
      expect(service.throwsLeft).toEqual(0);
      expect(service.activePlayer.score.current).toEqual(170);
    });
  });
});
