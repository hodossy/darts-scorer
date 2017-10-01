import { Component, Input } from '@angular/core';

import { CricketScore } from './cricket-score.model';

@Component({
  selector: 'app-cricket-score',
  templateUrl: './cricket-score.component.html',
  styleUrls: ['./cricket-score.component.css']
})
export class CricketScoreComponent {
  @Input() score: CricketScore;

  constructor() { }

}
