import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DartsTableComponent } from './darts-table.component';

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
});
