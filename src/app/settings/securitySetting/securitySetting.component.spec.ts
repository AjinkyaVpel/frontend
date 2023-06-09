import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySettingComponent } from './securitySetting.component';

describe('SecuritySettingComponent', () => {
  let component: SecuritySettingComponent;
  let fixture: ComponentFixture<SecuritySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuritySettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuritySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
