import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageEventsComponent } from './manage-events.component';

describe('ManageEventsComponent', () => {
  let component: ManageEventsComponent;
  let fixture: ComponentFixture<ManageEventsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
