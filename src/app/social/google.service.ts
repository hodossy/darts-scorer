import { Injectable } from '@angular/core';
import { PlayerService } from '../core/player.service';

const CLIENT_ID = "217086813887-1fi0gd3tn18eje8bgd80noddcvjojjuq.apps.googleusercontent.com";
const API_KEY = "AIzaSyDdRPCVGA-aMOHT4vksDxTEz8_aF18xREg";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.appdata';

// Based on https://hintdesk.com/2018/08/24/angular-google-drive-api-example/
@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private googleAuth: gapi.auth2.GoogleAuth;

  constructor(private playerService: PlayerService) { }

  initClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        }).then(() => {
          this.googleAuth = gapi.auth2.getAuthInstance();
          resolve();
        });
      });
    });
  }

  get isSignedIn(): boolean {
    return this.googleAuth.isSignedIn.get();
  }

  signIn() {
    return this.googleAuth.signIn({
      prompt: 'consent'
    }).then((googleUser: gapi.auth2.GoogleUser) => {
      this.playerService.setOwner(googleUser.getBasicProfile());
    });
  }

  signOut(): void {
    this.googleAuth.signOut();
  }
}
