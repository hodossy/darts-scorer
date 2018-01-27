import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DartsTableComponent } from './darts-table.component';
import { Throw } from '../core/throw.model';

describe('DartsTableComponent', () => {
  let component: DartsTableComponent;
  let fixture: ComponentFixture<DartsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DartsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DartsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fire throw events when sectors are clicked', fakeAsync(() => {
    let multipliers = ['s', 'd', 't'];
    let thr: Throw;
    component.throw.subscribe((value) => thr = value);
    fixture.debugElement.query(By.css('#s25')).triggerEventHandler('click', null);
    expect(thr.sector).toEqual(25);
    expect(thr.multiplier).toEqual(1);
    fixture.debugElement.query(By.css('#d25')).triggerEventHandler('click', null);
    expect(thr.sector).toEqual(25);
    expect(thr.multiplier).toEqual(2);
    for(var j = 0; j < 3; j++) {
      for(var i = 1; i <= 20; i++) {
        fixture.debugElement.query(By.css('#' + multipliers[j] + String(i)))
                            .triggerEventHandler('click', null);
        expect(thr.sector).toEqual(i);
        expect(thr.multiplier).toEqual(j + 1);
      }
    }
  }));
});
