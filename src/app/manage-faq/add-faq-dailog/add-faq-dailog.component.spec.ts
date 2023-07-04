import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaqDailogComponent } from './add-faq-dailog.component';

describe('AddFaqDailogComponent', () => {
  let component: AddFaqDailogComponent;
  let fixture: ComponentFixture<AddFaqDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFaqDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFaqDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
