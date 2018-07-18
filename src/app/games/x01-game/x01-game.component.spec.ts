import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { X01GameComponent } from './x01-game.component';
import { X01ScoreComponent } from './x01-score/x01-score.component';
import { X01SettingsComponent } from './x01-settings/x01-settings.component';

import { DartsTableComponent } from '../../darts-table/darts-table.component';
import { PlayerExtendableListComponent } from '../../player-extendable-list/player-extendable-list.component';

describe('X01GameComponent', () => {
  let component: X01GameComponent;
  let fixture: ComponentFixture<X01GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        X01GameComponent,
        X01ScoreComponent,
        X01SettingsComponent,
        DartsTableComponent,
        PlayerExtendableListComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X01GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
