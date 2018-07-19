import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { GameBaseService } from '../game-base/game-base.service';
import { X01GameService } from './x01-game.service';

@Component({
  selector: 'x01-game',
  templateUrl: './x01-game.component.html',
  styleUrls: ['./x01-game.component.css'],
  providers: [
    {provide: GameBaseService, useClass: X01GameService}
  ]
})
export class X01GameComponent {
}
