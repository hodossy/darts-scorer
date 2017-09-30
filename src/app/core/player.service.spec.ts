import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Player } from './player.model';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;
  let newPlayer: Player;

  beforeEach(() => {
    var store = { 'knownPlayers': '[{ "name": "Jane Doe" },{ "name": "John Doe" }]' };

    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService]
    });

    service = TestBed.get(PlayerService);
    newPlayer = new Player('Janet Doe');
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should set players', () => {
    let newPlayers: Player[] = [
      new Player('Jane Doe'),
      new Player('John Doe')
    ];
    service.players = newPlayers;
    expect(service.players.length).toEqual(2);
  });

  it('should retrieve players', () => {
    expect(service.getCachedPlayers().length).toEqual(2);
  });

  it('should add new players', () => {
    service.addPlayer(newPlayer);
    expect(service.players.length).toEqual(1);
  });

  it('should delete a player', () => {
    service.players = service.getCachedPlayers();
    service.deletePlayer(service.players.length - 1);
    expect(service.players.length).toEqual(1);
  });

  it('should store new players', () => {
    service.players = [newPlayer];
    service.storePlayers();
    expect(JSON.parse(localStorage.getItem('knownPlayers')).length).toEqual(3);
  });

  it('should not store known players', () => {
    service.players = [newPlayer, new Player('John Doe')];
    service.storePlayers();
    expect(JSON.parse(localStorage.getItem('knownPlayers')).length).toEqual(3);
  });
});
