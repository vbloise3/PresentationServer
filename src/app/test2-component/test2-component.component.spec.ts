import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test2ComponentComponent } from './test2-component.component';

describe('Test2ComponentComponent', () => {
  let component: Test2ComponentComponent;
  let fixture: ComponentFixture<Test2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
