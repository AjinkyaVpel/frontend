import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerSettingComponent } from './charger-setting.component';

describe('ChargerSettingComponent', () => {
  let component: ChargerSettingComponent;
  let fixture: ComponentFixture<ChargerSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
