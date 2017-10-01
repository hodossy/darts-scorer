import { Component, Input } from '@angular/core';

import { X01Score } from './x01-score.model';

@Component({
  selector: 'x01-score',
  templateUrl: './x01-score.component.html',
  styleUrls: ['./x01-score.component.css']
})
export class X01ScoreComponent {
  @Input() score: X01Score;

  constructor() { }

}
