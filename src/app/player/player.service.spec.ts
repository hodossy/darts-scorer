import { fakeAsync, tick } from '@angular/core/testing';

import { Player } from './player.model';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;
  let newPlayer: Player;
  let store = {};

  beforeEach(() => {
    service = new PlayerService();
    newPlayer = new Player('Jane Doe');
  });

  beforeEach(() => {
    store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should add Player', () => {
    service.addPlayer(newPlayer);
    service.getPlayers().then((players) => {
      expect(players.length).toBe(1);
      expect(players[0]).toEqual(newPlayer);
    });
  });

  it('should store players', fakeAsync(() =>{
    service.addPlayer(newPlayer);
    service.storePlayers()
    let storedPlayers: Player[];
    service.getPlayers().then((players) => { storedPlayers = players; });
    tick();
    expect(store['knownPlayers']).toEqual(JSON.stringify(storedPlayers));
  }));

  it('should retrieve no players from empty storage', fakeAsync(() => {
    service.retrievePlayers();
    let retrievedPlayers: Player[];
    service.getPlayers().then((players) => { retrievedPlayers = players; });
    tick();
    expect(retrievedPlayers).toEqual(new Array<Player>());
  }));

  it('should retrieve players from storage', fakeAsync(() => {
    localStorage.setItem('knownPlayers', JSON.stringify([newPlayer,]))
    service.retrievePlayers();
    let retrievedPlayers: Player[];
    service.getPlayers().then((players) => { retrievedPlayers = players; });
    tick();
    expect(retrievedPlayers).toEqual([newPlayer,]);
  }));
});
