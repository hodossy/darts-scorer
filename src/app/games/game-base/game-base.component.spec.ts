import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { GameBaseComponent } from './game-base.component';
import { GameBaseService } from './game-base.service';

import { DartsTableComponent } from '../../darts-table/darts-table.component';
import { PlayerExtendableListComponent } from '../../player-extendable-list/player-extendable-list.component';


describe('GameBaseComponent', () => {
  let component: GameBaseComponent;
  let fixture: ComponentFixture<GameBaseComponent>;
  let el: DebugElement;
  let service: GameBaseService;

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
    service = TestBed.get(GameBaseService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBaseComponent);
    el = fixture.debugElement
    component = el.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the init view first', () => {
    expect(el.query(By.css('#game-init'))).toBeTruthy();
  });

  it('should display the player list in the init view', () => {
    expect(el.query(By.css('#player-list'))).toBeTruthy();
  });

  it('should display the settings in the init view', () => {
    expect(el.query(By.css('#game-settings'))).toBeTruthy();
  });

  it('should display the play view when the game is started', () => {
    service.isStarted = true;
    fixture.detectChanges();
    expect(el.query(By.css('#game-play'))).toBeTruthy();
  });

  it('should display the darts table when the game is started', () => {
    service.isStarted = true;
    fixture.detectChanges();
    expect(el.query(By.css('darts-table'))).toBeTruthy();
  });

  it('should display the player scores when the game is started', () => {
    service.isStarted = true;
    fixture.detectChanges();
    expect(el.query(By.css('#player-scores'))).toBeTruthy();
  });
});
