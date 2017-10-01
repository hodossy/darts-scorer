import { Component, Input } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { X01Settings } from './x01-settings.model';

@Component({
  selector: 'x01-settings',
  templateUrl: './x01-settings.component.html',
  styleUrls: ['./x01-settings.component.css']
})
export class X01SettingsComponent {
  @Input() settings: X01Settings;

  scoreOptions = [
    {value: 301, viewValue: '301'},
    {value: 501, viewValue: '501'},
    {value: 701, viewValue: '701'},
    {value: 1001, viewValue: '1001'}
  ];

  constructor() { }

}
