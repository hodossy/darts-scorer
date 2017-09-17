import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { X01GameComponent } from './x01-game.component';
import { PlayerService } from '../../player/player.service';

describe('GameComponent', () => {
  let component: X01GameComponent;
  let fixture: ComponentFixture<X01GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ X01GameComponent ],
      providers: [ PlayerService ]
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
