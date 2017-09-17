import { Injectable } from '@angular/core';

import { Player } from './player.model';

@Injectable()
export class PlayerService {
  private storageKey: string = 'knownPlayers';
  private _players: Player[];
  private cachedPlayers: Player[];

  constructor() {
    this.retrievePlayers();
  }

  get players(): Player[] {
    if(!this._players) this._players = new Array<Player>();
    return this._players;
  }

  set players(players: Player[]) {
    this._players = players;
  }

  addPlayer(newPlayer: Player) {
    this.players.push(newPlayer);
  }

  deletePlayer(idx: number) {
    this.players.splice(idx, 1);
  }

  getCachedPlayers(): Player[] {
    return this.cachedPlayers;
  }

  storePlayers() {
    // TODO: update existing keys and add new one before storing
    for(let i = 0; i < this.players.length; i++) {
      let found = false;
      for (let j = 0; j < this.cachedPlayers.length; j++) {
        if (this.players[i].equals(this.cachedPlayers[j])) {
          found = true;
        }
      }
      if (!found) this.cachedPlayers.push(this.players[i]);
    }
    console.log('Storing players: ' + JSON.stringify(this.cachedPlayers));
    localStorage.setItem(this.storageKey, JSON.stringify(this.cachedPlayers));
  }

  retrievePlayers() {
    let retrievedObjects = JSON.parse(localStorage.getItem(this.storageKey));
    if (retrievedObjects) {
      this.cachedPlayers = retrievedObjects.map(obj => new Player(obj.name));
    } else {
      this.cachedPlayers = new Array<Player>();
    }
  }
}
