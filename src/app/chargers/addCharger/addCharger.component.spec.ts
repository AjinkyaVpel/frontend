import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargerComponent } from './addCharger.component';

describe('AddChargerComponent', () => {
  let component: AddChargerComponent;
  let fixture: ComponentFixture<AddChargerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChargerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
