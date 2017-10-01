import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketGameComponent } from './cricket-game.component';

describe('CricketGameComponent', () => {
  let component: CricketGameComponent;
  let fixture: ComponentFixture<CricketGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketGameComponent ]
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
