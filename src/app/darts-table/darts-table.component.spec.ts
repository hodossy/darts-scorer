import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DartsTableComponent } from './darts-table.component';
import { Throw } from './throw.model';

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
    spyOn(component.throw, 'emit');
    fixture.nativeElement.querySelector('#s25').click();
    fixture.nativeElement.querySelector('#d25').click();
    for(var j in multipliers) {
      for(var i=1; i<=20; i++) {
        fixture.nativeElement.querySelector('#'+multipliers[j]+String(i)).click();
      }
    }

    fixture.detectChanges();
    tick();
    expect(component.throw.emit).toHaveBeenCalledTimes(62);
  }));

  it('should pass Throws when a sector is clicked', fakeAsync(() => {
    component.throw.subscribe((t) => {
      expect(t.sector).toEqual(25);
      expect(t.multiplier).toEqual(1);
    });
    fixture.nativeElement.querySelector('#s25').click();
    fixture.detectChanges();
    tick();
  }));
});
