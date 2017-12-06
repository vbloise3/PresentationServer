import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsClientComponent } from './nps-client.component';

describe('NpsClientComponent', () => {
  let component: NpsClientComponent;
  let fixture: ComponentFixture<NpsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
