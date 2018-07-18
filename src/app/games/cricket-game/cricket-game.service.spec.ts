import { TestBed, inject } from '@angular/core/testing';

import { CricketGameService } from './cricket-game.service';

import { Throw } from '../../core/throw.model';
import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';

describe('CricketGameService', () => {
  let service: CricketGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CricketGameService, PlayerService]
    });
    TestBed.get(PlayerService).players = [
      new Player('Jane Doe'),
      new Player('John Doe'),
    ];
    service = TestBed.get(CricketGameService);
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

    it('should set first player', () => {
      expect(service.activePlayer).toBeDefined();
      expect(service.activePlayerIdx).toEqual(0);
    });
  });

  describe('handleScore()', () => {
    it('should count sectors until 3 hit', () => {
      service.handleScore(new Throw(20, 1));
      expect(service.activePlayer.score.numbers['20']).toEqual(1);

      service.handleScore(new Throw(20, 3));
      expect(service.activePlayer.score.numbers['20']).toEqual(3);
    })

    it('should add to current score for every hit over 3rd', () => {
      service.handleScore(new Throw(20, 3));
      service.handleScore(new Throw(20, 3));
      service.handleScore(new Throw(20, 3));
      expect(service.activePlayer.score.numbers['20']).toEqual(3);
      expect(service.activePlayer.score.current).toEqual(120);
    });

    it('should ignore other numbers', () => {
      let currentState = Object.assign({}, service.activePlayer.score.numbers)
      service.handleScore(new Throw(1, 3));
      service.handleScore(new Throw(5, 3));
      service.handleScore(new Throw(10, 3));
      expect(service.activePlayer.score.numbers).toEqual(currentState);
    });
  });

  describe('checkWin()', () => {
    it('should detect win condition', () => {
      service.handleScore(new Throw(15, 3));
      expect(service.checkWin()).toBeFalsy()
      service.handleScore(new Throw(16, 3));
      expect(service.checkWin()).toBeFalsy()
      service.handleScore(new Throw(17, 3));
      expect(service.checkWin()).toBeFalsy()
      service.handleScore(new Throw(18, 3));
      expect(service.checkWin()).toBeFalsy()
      service.handleScore(new Throw(19, 3));
      expect(service.checkWin()).toBeFalsy()
      service.handleScore(new Throw(20, 3));
      expect(service.checkWin()).toBeFalsy()
      service.handleScore(new Throw(25, 3));
      expect(service.checkWin()).toBeTruthy()
    });
  });
});
