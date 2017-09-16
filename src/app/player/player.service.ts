import { Injectable } from '@angular/core';

import { Player } from './player.model';

@Injectable()
export class PlayerService {
  private storageKey: string = 'knownPlayers';
  private cachedPlayers: Player[] = [];

  constructor() {
    this.retrievePlayers();
  }

  get players(): Player[] {
    return this.players || new Array<Player>();
  }

  set players(players: Player[]) {
    this.players = players;
  }

  getCachedPlayers(): Player[] {
    return this.cachedPlayers;
  }

  storePlayers() {
    // TODO: update existing keys and add new one before storing
    localStorage.setItem(this.storageKey, JSON.stringify(this.players));
  }

  retrievePlayers() {
    let retrievedObjects = JSON.parse(localStorage.getItem(this.storageKey));
    if(retrievedObjects){
      this.cachedPlayers = retrievedObjects.map(obj => new Player(obj.name));
    } else {
      this.cachedPlayers = new Array<Player>();
    }
  }
}
