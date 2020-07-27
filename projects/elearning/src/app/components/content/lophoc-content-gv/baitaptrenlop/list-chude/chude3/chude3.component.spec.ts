import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chude3Component } from './chude3.component';

describe('Chude3Component', () => {
  let component: Chude3Component;
  let fixture: ComponentFixture<Chude3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chude3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chude3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
