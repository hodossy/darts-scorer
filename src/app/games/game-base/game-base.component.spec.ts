import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { GameBaseComponent } from './game-base.component';

import { DartsTableComponent } from '../../darts-table/darts-table.component';
import { PlayerExtendableListComponent } from '../../player-extendable-list/player-extendable-list.component';

import { Player } from '../../core/player.model';
import { PlayerService } from '../../core/player.service';
import { Throw } from '../../core/throw.model';

describe('GameBaseComponent', () => {
  let component: GameBaseComponent;
  let fixture: ComponentFixture<GameBaseComponent>;
  let service: PlayerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBaseComponent,
        DartsTableComponent,
        PlayerExtendableListComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule ]
    })
    .compileComponents();
    TestBed.get(PlayerService).players = [
      new Player('Jane Doe'),
      new Player('John Doe'),
      new Player('Janet Doe'),
      new Player('Jack Doe'),
    ];
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onStart();
  });

  beforeEach(() => {
    component.checkWin = () => { return false; }
    component.handleScore = (score: Throw) => {}
    component.handleStart = () => {}
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize players', () => {
    expect(component.players.length).toEqual(4);
  });

  it('should set next player', () => {
    for(let i = 1; i < component.players.length * 2; i++) {
      component.setNextPlayer(i);
      expect(component.activePlayer).toBe(component.players[i % component.players.length]);
      expect(component.activePlayerIdx).toEqual(i % component.players.length);
    }
  });

  describe("onThrow()", () => {
    it('should call handleScore and checkWin', () => {
      let handleScoreSpy = spyOn(component, "handleScore");
      let checkWinSpy = spyOn(component, "checkWin");
      component.onThrow(new Throw(1, 3));
      expect(handleScoreSpy).toHaveBeenCalled();
      expect(checkWinSpy).toHaveBeenCalled();
    });

    it('should select next player after 3 throws', () => {
      let activeIdx = 0;
      for(let i = 1; i <= component.players.length * 6; i++) {
        component.onThrow(new Throw(1, 3));
        if (i % 3 === 0) {
          activeIdx = (i / 3) % component.players.length;
          expect(component.activePlayer).toBe(component.players[activeIdx],
            "Failed after " + i + " iterations!")
        }
      }
    });
  });

  describe('onStart()', () => {
    it('should set isStarted to true', () => {
      expect(component.isStarted).toBeTruthy();
    });

    it('should call handleStart', () => {
      let handleStartSpy = spyOn(component, "handleStart");
      component.onStart();
      expect(handleStartSpy).toHaveBeenCalled();
    });
  })
});