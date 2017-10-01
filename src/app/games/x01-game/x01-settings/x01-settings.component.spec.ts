import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { X01SettingsComponent } from './x01-settings.component';
import { X01Settings } from './x01-settings.model';

describe('X01SettingsComponent', () => {
  let component: X01SettingsComponent;
  let fixture: ComponentFixture<X01SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, CoreModule, SharedModule ],
      declarations: [ X01SettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X01SettingsComponent);
    component = fixture.componentInstance;
    component.settings = new X01Settings();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
