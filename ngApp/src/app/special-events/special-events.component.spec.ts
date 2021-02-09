import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpecialEventsComponent } from './special-events.component';

describe('SpecialEventsComponent', () => {
  let component: SpecialEventsComponent;
  let fixture: ComponentFixture<SpecialEventsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
