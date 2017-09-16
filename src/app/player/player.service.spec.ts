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
});
