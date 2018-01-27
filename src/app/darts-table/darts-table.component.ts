import { Component, Output, EventEmitter } from '@angular/core';

import { Throw } from '../core/throw.model';

@Component({
  selector: 'darts-table',
  templateUrl: './darts-table.component.html',
  styleUrls: ['./darts-table.component.css']
})
export class DartsTableComponent {
  @Output() throw: EventEmitter<Throw> = new EventEmitter<Throw>();

  onClick(sector, multiplier) {
    this.throw.emit(new Throw(+sector, +multiplier));
  }
}
