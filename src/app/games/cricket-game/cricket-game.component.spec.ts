import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { DartsTableComponent } from '../../darts-table/darts-table.component';
import { PlayerExtendableListComponent } from '../../player-extendable-list/player-extendable-list.component';

import { CricketGameComponent } from './cricket-game.component';
import { CricketScoreComponent } from './cricket-score/cricket-score.component';

describe('CricketGameComponent', () => {
  let component: CricketGameComponent;
  let fixture: ComponentFixture<CricketGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, CoreModule, SharedModule ],
      declarations: [
        CricketGameComponent,
        CricketScoreComponent,
        DartsTableComponent,
        PlayerExtendableListComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
