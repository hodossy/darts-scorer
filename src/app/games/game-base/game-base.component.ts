import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatInputModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { GameBaseService } from './game-base.service'

@Component({
  selector: 'game-base',
  templateUrl: './game-base.component.html',
  styleUrls: ['./game-base.component.css']
})
export class GameBaseComponent implements OnInit {
  @Input() settingsTemplate: TemplateRef<any>;
  @Input() scoreTemplate: TemplateRef<any>;

  constructor(private game: GameBaseService) { }

  ngOnInit() {}
}
