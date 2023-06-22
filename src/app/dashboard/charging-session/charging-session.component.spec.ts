import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingSessionComponent } from './charging-session.component';

describe('ChargingSessionComponent', () => {
  let component: ChargingSessionComponent;
  let fixture: ComponentFixture<ChargingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargingSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
