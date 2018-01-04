import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineInsertComponent } from './inline-insert.component';

describe('InlineInsertComponent', () => {
  let component: InlineInsertComponent;
  let fixture: ComponentFixture<InlineInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
