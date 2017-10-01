import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { X01SettingsComponent } from './x01-settings.component';

describe('X01SettingsComponent', () => {
  let component: X01SettingsComponent;
  let fixture: ComponentFixture<X01SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ X01SettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X01SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
