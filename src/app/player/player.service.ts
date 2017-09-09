import { Injectable } from '@angular/core';

import { Player } from './player.model';

@Injectable()
export class PlayerService {
  private storageKey: string = 'knownPlayers';
  private players: Player[];

  constructor() {
    this.retrievePlayers();
  }

  addPlayer(newPlayer: Player) {
    this.players.push(newPlayer);
  }

  getPlayers(): Promise<Player[]> {
    return Promise.resolve(this.players);
  }

  storePlayers() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.players));
  }

  retrievePlayers() {
    let retrievedObjects = JSON.parse(localStorage.getItem(this.storageKey));
    if(retrievedObjects){
      this.players = retrievedObjects.map(obj => new Player(obj.name));
    } else {
      this.players = new Array<Player>();
    }
  }
}
