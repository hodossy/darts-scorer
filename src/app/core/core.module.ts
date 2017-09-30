import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdChipsModule,
  MdFormFieldModule,
  MdInputModule,
  MdListModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTabsModule
} from '@angular/material';

import { PlayerService } from './player.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    CommonModule,
    MdButtonModule,
    MdChipsModule,
    MdFormFieldModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdTabsModule
  ],
  providers: [ PlayerService ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
