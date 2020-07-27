import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chude1Component } from './chude1.component';

describe('Chude1Component', () => {
  let component: Chude1Component;
  let fixture: ComponentFixture<Chude1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chude1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chude1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
