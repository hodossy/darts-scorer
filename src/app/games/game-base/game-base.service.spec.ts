import { TestBed, inject } from '@angular/core/testing';

import { GameBaseService } from './game-base.service';
import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';

describe('GameBaseService', () => {
  let service: GameBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameBaseService, PlayerService]
    });
    TestBed.get(PlayerService).players = [
      new Player('Jane Doe'),
      new Player('John Doe'),
      new Player('Janet Doe'),
      new Player('Jack Doe'),
    ];
    service = TestBed.get(GameBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize players', () => {
    expect(service.players.length).toEqual(4);
  });

  it('should set next player', () => {
    for(let i = 1; i < service.players.length * 2; i++) {
      service.setNextPlayer(i);
      expect(service.activePlayer).toBe(service.players[i % service.players.length]);
      expect(service.activePlayerIdx).toEqual(i % service.players.length);
    }
  });

  describe("onThrow()", () => {
    beforeEach(() => {
      spyOn(service, "checkWin").and.callFake(() => { return false; });
      spyOn(service, "handleScore").and.callFake((score: Throw) => {});
    });

    it('should call handleScore and checkWin', () => {
      service.onThrow(new Throw(1, 3));
      expect(service.checkWin).toHaveBeenCalled();
      expect(service.handleScore).toHaveBeenCalled();
    });

    it('should select next player after 3 throws', () => {
      let activeIdx = 0;
      service.activePlayerIdx = 0;
      for(let i = 1; i <= service.players.length * 6; i++) {
        service.onThrow(new Throw(1, 3));
        if (i % 3 === 0) {
          activeIdx = (i / 3) % service.players.length;
          expect(service.activePlayer).toBe(service.players[activeIdx],
            "Failed after " + i + " iterations!")
        }
      }
    });
  });

  describe('onStart()', () => {
    beforeEach(() => {
      spyOn(service, "handleStart").and.callFake(() => {});
    });

    it('should set isStarted to true', () => {
      service.onStart();
      expect(service.isStarted).toBeTruthy();
    });

    it('should call handleStart', () => {
      service.onStart();
      expect(service.handleStart).toHaveBeenCalled();
    });
  })
});
