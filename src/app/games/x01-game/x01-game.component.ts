import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { X01GameService } from './x01-game.service';

@Component({
  selector: 'x01-game',
  templateUrl: './x01-game.component.html',
  styleUrls: ['./x01-game.component.css']
})
export class X01GameComponent {
  constructor(game: X01GameService) {}
}
