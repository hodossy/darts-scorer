import { Component, Output, EventEmitter } from '@angular/core';

import { Throw } from './throw.model';

@Component({
  selector: 'darts-table',
  templateUrl: './darts-table.component.html',
  styleUrls: ['./darts-table.component.css']
})
export class DartsTableComponent {
  @Output() throw: EventEmitter<Throw>;

  constructor() { }

  ngOnInit() {
    this.throw = new EventEmitter<Throw>();
  }
}
