import { Component, Output, EventEmitter } from '@angular/core';

import { Throw } from '../core/throw.model';

@Component({
  selector: 'darts-table',
  templateUrl: './darts-table.component.html',
  styleUrls: ['./darts-table.component.css']
})
export class DartsTableComponent {
  @Output() throw: EventEmitter<Throw> = new EventEmitter<Throw>();

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.nodeValue;
    let multiplier = 0;
    switch(id.slice(0, 1)) {
      case "s":
        multiplier = 1;
        break;
      case "d":
        multiplier = 2;
        break;
      case "t":
        multiplier = 3;
        break;
    }
    this.throw.emit(new Throw(+id.slice(1), multiplier));
  }
}
