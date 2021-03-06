import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketScoreComponent } from './cricket-score.component';
import { CricketScore } from './cricket-score.model';

describe('CricketScoreComponent', () => {
  let component: CricketScoreComponent;
  let fixture: ComponentFixture<CricketScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketScoreComponent);
    component = fixture.componentInstance;
    component.score = new CricketScore();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
