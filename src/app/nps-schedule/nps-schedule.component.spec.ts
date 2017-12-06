import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsScheduleComponent } from './nps-schedule.component';

describe('NpsScheduleComponent', () => {
  let component: NpsScheduleComponent;
  let fixture: ComponentFixture<NpsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
