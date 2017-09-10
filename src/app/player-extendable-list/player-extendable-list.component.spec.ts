import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerExtendableListComponent } from './player-extendable-list.component';

describe('PlayerExtendableListComponent', () => {
  let component: PlayerExtendableListComponent;
  let fixture: ComponentFixture<PlayerExtendableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerExtendableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerExtendableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
