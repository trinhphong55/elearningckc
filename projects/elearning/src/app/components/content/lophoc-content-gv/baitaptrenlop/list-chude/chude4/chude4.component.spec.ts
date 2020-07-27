import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chude4Component } from './chude4.component';

describe('Chude4Component', () => {
  let component: Chude4Component;
  let fixture: ComponentFixture<Chude4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chude4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chude4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
