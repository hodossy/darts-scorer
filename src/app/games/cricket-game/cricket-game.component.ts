import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { GameBaseService } from '../game-base/game-base.service';
import { CricketGameService } from './cricket-game.service';

@Component({
  selector: 'cricket-game',
  templateUrl: './cricket-game.component.html',
  styleUrls: ['./cricket-game.component.css'],
  providers: [
    {provide: GameBaseService, useClass: CricketGameService}
  ]
})
export class CricketGameComponent {
}
