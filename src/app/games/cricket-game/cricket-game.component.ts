import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { CricketGameService } from './cricket-game.service';
import { CricketScoreComponent } from './cricket-score/cricket-score.component';

@Component({
  selector: 'cricket-game',
  templateUrl: './cricket-game.component.html',
  styleUrls: ['./cricket-game.component.css']
})
export class CricketGameComponent {
  constructor(game: CricketGameService) {}
}
