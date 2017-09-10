import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PlayerExtendableListComponent } from './player-extendable-list.component';

describe('PlayerExtendableListComponent', () => {
  let component: PlayerExtendableListComponent;
  let fixture: ComponentFixture<PlayerExtendableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerExtendableListComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerExtendableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.newPlayerName = 'Jane Doe';
    component.addPlayer();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new player', () => {
    component.newPlayerName = 'John Doe';
    component.addPlayer();
    fixture.detectChanges();
    expect(component.players.length).toEqual(2);
    expect(component.players[1].name).toEqual('John Doe');
    expect(this.hasError).toBeFalsy();
  });

  it('should not add a new player twice', () => {
    component.newPlayerName = 'John Doe';
    component.addPlayer();
    fixture.detectChanges();
    component.newPlayerName = 'John Doe';
    component.addPlayer();
    fixture.detectChanges();
    expect(component.players.length).toEqual(2);
    expect(component.players[1].name).toEqual('John Doe');
    expect(component.hasError).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#error-msg').innerHTML).toContain('John Doe');
  });

  it('should not add a new player without a name', () => {
    component.newPlayerName = '';
    component.addPlayer();
    component.newPlayerName = null;
    component.addPlayer();
    fixture.detectChanges();
    expect(component.players.length).toEqual(1);
    expect(this.hasError).toBeFalsy();
  });

  it('should remove a player', () => {
    component.removePlayer(0);
    expect(component.players.length).toEqual(0);
  });

  it('should remove only one player', () => {
    component.newPlayerName = 'John Doe';
    component.addPlayer();
    fixture.detectChanges();
    component.removePlayer(0);
    expect(component.players.length).toEqual(1);
  });
});
