import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { X01ScoreComponent } from './x01-score.component';

describe('X01ScoreComponent', () => {
  let component: X01ScoreComponent;
  let fixture: ComponentFixture<X01ScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ X01ScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X01ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
