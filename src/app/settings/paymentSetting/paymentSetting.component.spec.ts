import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSettingComponent } from './paymentSetting.component';

describe('PaymentSettingComponent', () => {
  let component: PaymentSettingComponent;
  let fixture: ComponentFixture<PaymentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
