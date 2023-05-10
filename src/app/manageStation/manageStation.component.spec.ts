import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStationComponent } from './manageStation.component';

describe('ManageStationComponent', () => {
  let component: ManageStationComponent;
  let fixture: ComponentFixture<ManageStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
