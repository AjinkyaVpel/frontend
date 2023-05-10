import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAccessComponent } from './control-access.component';

describe('ControlAccessComponent', () => {
  let component: ControlAccessComponent;
  let fixture: ComponentFixture<ControlAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
