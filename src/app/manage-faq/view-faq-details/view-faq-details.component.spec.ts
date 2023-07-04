import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFaqDetailsComponent } from './view-faq-details.component';

describe('ViewFaqDetailsComponent', () => {
  let component: ViewFaqDetailsComponent;
  let fixture: ComponentFixture<ViewFaqDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFaqDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFaqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
